import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Login.css';

const Login = () => {
      // useState para controlar la validación del formulario
      const [validated, setValidated] = useState(false);
      // useState para almacenar los valores de los campos del formulario
      const [formValues, setFormValues] = useState({ email: "", password: "",});
      // useState para controlar el estado de envío del formulario
      const [isSubmitting, setIsSubmitting] = useState(false);
      // hook de React Router DOM para navegar a diferentes rutas
      const navigate = useNavigate();

  

          // Función que se ejecuta cuando se envía el formulario
          const handleSubmit = async (event) => {
            event.preventDefault(); // previene el comportamiento por defecto del formulario
            const form = event.currentTarget; // obtiene el formulario
            
            // Si el formulario no es válido, muestra los errores y detiene la función
            if (form.checkValidity() === false) {
              event.stopPropagation();
              setValidated(true);
              return;
            }
          
            // El formulario es válido, se establece que se está enviando
          setIsSubmitting(true);

          const { email, password } = formValues;

          const apiUrl = `https://analisis-sistemas.azurewebsites.net/api/loginadministrador?correo=${email}&password=${password}`;


          const formData = { correo: {email}, password: {password} };
          try {
             // Envía una petición POST al servidor con los datos del formulario
            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
            });
            
            const data = await response.json(); // Obtiene la respuesta en formato JSON
            const rol_usuario = data.rol; // Obtiene el rol del usuario de la respuesta
            
            // Si la respuesta no es ok, lanza un error
          if (!response.ok) {
            throw new Error('Incorrect Email o Password');
          }else{
             // Muestra un toast de bienvenida con el rol del usuario
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
              title: `Bienvenido ${rol_usuario}`
            })
          }

            // Si el rol del usuario es administrador, establece el valor del localStorage y navega a la ruta de admin
          if (rol_usuario === "ADMINISTRADOR") {
            console.log(JSON.stringify({ message: 'Bienvenido Administrador' }));
          localStorage.setItem("user", "admin");
          navigate('/admin');
           // Si el rol del usuario es operador, establece el valor del localStorage y navega a la ruta de operador
          } else if (rol_usuario === "OPERADOR"){
            console.log(JSON.stringify({ message: 'Bienvenido Operador' }));
          localStorage.setItem("user", "operador");
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
          text: 'Incorrect Email o Password',
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
              Login 
            </>
          )}
        </Button>
      </Form>
    </div>
  );
}

export default Login;