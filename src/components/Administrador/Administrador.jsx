import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Administrador = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
 //   localStorage.setItem('user');
    navigate('/');
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="admin">
            <img
              alt=""
              src="./Images/umg.png"
              width="60"
              height="37"
              className="d-inline-block align-top"
            />
            {' '}
            Proyecto Analisis de Sistemas I
          </Navbar.Brand>
          <Nav className="me-auto">
          <Button variant="primary"onClick={handleLogout}  style={{marginLeft:'780px',boxShadow:'1px 5px 4px rgba(0, 0, 0, 0.7)'}}>Sign off</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Administrador;