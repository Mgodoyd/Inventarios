import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaGreaterThan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "",});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  

    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
    
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        return;
      }
    
      setIsSubmitting(true);
      const { email, password } = formValues;

      const apiUrl = `https://anlisis-sistemasi.azure-api.net/analisis-sistemas/loginAdministrador?correo=${email}&password=${password}`;
      
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: JSON.stringify({
            correo: email,
            password: password
          }),
          headers: {
            "Content-Type": "application/json",
            "Content-Encoding": "gzip",
            "Transfer-Encoding": "chunked",
            "Vary": "Accept-Encoding"
          }
        });
      
        console.log(response);

      if (!response.ok) {
        throw new Error('Incorrect Email o Password');
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: `Bienvenido`
        })
      }

      const data = await response.json(); // convierte la respuesta en formato JSON
      const rol_usuario = data.rol; // extrae el valor del rol_id del cuerpo de la respuesta
      console.log(data.id_usuario);

      if (rol_usuario === 2) {
        console.log(JSON.stringify({ message: 'Bienvenido Administrador' }));
      // localStorage.setItem("user", "admin");
       navigate('/admin');
      } else if (rol_usuario === 1){
        console.log(JSON.stringify({ message: 'Bienvenido Operador' }));
      //  localStorage.setItem("user", "operador");
        navigate('/operador');
      }
    } catch (error) {
      handleError(error);
    } finally {

      setIsSubmitting(false);
      setValidated(true);
    }
  };

  const handleError = (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  };


  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };


  return (
    <div style={{ marginLeft: '25%', marginTop: '35%' }}>
      <div style={{ position: 'absolute', top: 15, right: -20 }}>
        <Image src="./Images/umg.png" style={{ width: '170px', height: 'auto' }} />
      </div>
      <h1>Login</h1>
      <h3>Please fill your information below</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ width: '65%' }}>
        <Form.Group className="mb-3" controlId="validationCustomemail">
          <div className="input-with-icon">
            <Form.Control
              style={{ height: '45px' }}
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formValues.email}
            />
            <span className="input-icon">
              <FaEnvelope />
            </span>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustompassword">
          <div className="input-with-icon">
            <Form.Control
              style={{ height: '45px' }}
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formValues.password}
            />
            <span className="input-icon">
              <FaLock />
            </span>
          </div>
        </Form.Group>
        <Button className="submit-button" variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : (
            <>
              Login <FaGreaterThan />
            </>
          )}
        </Button>
      </Form>
    </div>
  );
        }

export default Login;