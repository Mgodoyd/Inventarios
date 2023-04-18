import React, { useState } from 'react';
import {Form , Button, Image} from 'react-bootstrap';
import { FaEnvelope,FaLock,FaGreaterThan } from "react-icons/fa";
import Swal from 'sweetalert2'
import './Login.css';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const correo = formValues.email;
      const contrasena = formValues.password;
      let url = '';

      if (formValues.isAdmin) {
        url = `http://localhost:8080/WebApplication1/web/Product/administrador/${correo}/${contrasena}`;
      } else {
        url = `http://localhost:8080/WebApplication1/web/Product/operador/${correo}/${contrasena}`;
      }
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })
      .then(response => {
        if (!response.ok) {
          if (!formValues.isAdmin) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invalid email or password',
            });
          } else if (formValues.isAdmin) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No eres administrador',
            });
          } else if (formValues.isAdmin){ 
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email o password incorrect',
            });
          }
        }
        return response.json();
      })
      .then(data => {
        // Aquí puedes hacer algo con los datos que recibes
        console.log(data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password',
        });
      });
      setValidated(true);
    }
  };
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };
       

  return (
    <div style={{marginLeft:"25%", marginTop:"35%"}}>
      <div style={{ position: 'absolute', top: 15, right: -20 }}>
        <Image src="./Images/umg.png" style={{ width: '170px', height: 'auto' }} />
      </div>
      <h1>Login</h1>
      <h3>Please fill your information below</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit} style ={{width:"65%"}}>
        <Form.Group className="mb-3" controlId="validationCustomemail">
          <div className="input-with-icon">
            <Form.Control
              style={{height:"45px"}}
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formValues.email}
            />
            <span className="input-icon"><FaEnvelope /></span>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustompassword">
          <div className="input-with-icon">
            <Form.Control
              style={{height:"45px"}}
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formValues.password}
            />
            <span className="input-icon"><FaLock /></span>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Adminitrador" name="isAdmin" onChange={handleChange}  />
      </Form.Group>
        <Button className='submit-button' variant="primary" type="submit">
          Login <FaGreaterThan />
        </Button>
      </Form>
    </div>
  );
}

export default Login;
