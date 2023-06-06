import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const navigate = useNavigate(); // Add this line to access the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set the submitButtonClicked state to true to indicate that the submit button was clicked
    setSubmitButtonClicked(true);

    const confirmed = await Swal.fire({
      title: '¿Estás seguro de actualizar la contraseña?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });

    if (confirmed.isConfirmed) {
      const Conexion = async () => {   
        const apiUrl = `https://analisis-sistemas.azurewebsites.net/api/updatepassword?correo=${email}&password=${password}`;

        const formData = { correo: email, password: password };
        try {
          // Envía una petición POST al servidor con los datos del formulario
          const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });

          // Hacer algo con la respuesta del servidor aquí
          //console.log(response);

          if (response.status === 400) {
            // Mostrar mensaje de error si el usuario no existe
            Swal.fire('Email no existe', '', 'error');
          } else if (response.status === 200) {
            // Mostrar alerta de éxito si la contraseña se actualizó correctamente
            Swal.fire('Contraseña actualizada', '', 'success').then(() => {
              navigate('/'); // Redirect to the login page
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      // Invoca la función de conexión
      await Conexion();
    }

    // Clear form fields after submission
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  };
  

  return (
    <div className='container-form'>
      <div style={{ position: 'absolute', top: 15, right: -20 }}>
        <Image src="../../../Images/umg.png" style={{ width: '170px', height: 'auto' }} />
      </div>
      <div className='password'></div>
      <Form className='form-password' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className='text'>Email address</Form.Label>
          <Form.Control
            className={`email-password ${submitButtonClicked && email === '' ? 'required-field' : ''}`}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className='text'>New Password</Form.Label>
          <Form.Control
            className={`password-from ${submitButtonClicked && password === '' ? 'required-field' : ''}`}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="repeatpassword">
          <Form.Label className='text'>Repeat Password</Form.Label>
          <Form.Control
            className={`password-from ${submitButtonClicked && repeatpassword === '' ? 'required-field' : ''}`}
            type="password"
            placeholder="Repeat Password"
            value={repeatpassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className='button-password' variant="primary" type="submit" onClick={() => setSubmitButtonClicked(true)}>
          Submit
        </Button>
      </Form>
    </div>
  );

};

export default UpdatePassword;
