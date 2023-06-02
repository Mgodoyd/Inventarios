import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughWink, faTachometerAlt, faTable, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './img/undraw_profile_2.png';

const BitacoraEliminar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    fetch("https://analisis-sistemas.azurewebsites.net/api/bitacoradelete")
      .then((response) => response.json())
      .then((data) => {
        setData(data.products); // Asigna la primera lista a data
       setData2(data.products2); // Asigna la segunda lista a data2
        console.log(data.products);
      });
  }, []);

  const handleToggleSidebar = () => {
    const sidebar = document.querySelector(".mySidebar");
    sidebar.classList.toggle("toggled");
  };

  const tablespage = () => {
    navigate('/admin/tables');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDropdown = () => {
    setShowLogout(!showLogout);
  };

  const pageinicio = () => {
    navigate('/admin');
  };

  const movimiento = () => {
    navigate('/admin/movimientos');
  };
  const eliminacion = () => {
    navigate('/admin/bitacora');
  };


    return (
        <div id="wrapper">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion mySidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <FontAwesomeIcon icon={ faLaughWink } size="2x" style={{color: "#ffffff",}} />
            </div>
            <div className="sidebar-brand-text mx-3"> Inventario - SCRUM<sup>2</sup></div>
          </a>

         

          <li className="nav-item active">
            <a className="nav-link" href=" " onClick={pageinicio}>
              <FontAwesomeIcon icon={faTachometerAlt} style={{color: "#ffffff",}} />
              <span style={{marginLeft:"10px"}}>Pantalla de inicio</span>
            </a>
          </li>

        

          <div className="sidebar-heading">
            Existencia:
          </div>

          <li className="nav-item">
            <a className="nav-link" href=" " onClick={tablespage}>
              <FontAwesomeIcon icon={faTable} style={{color: "#ffffff",}} />
              <span style={{marginLeft:"10px"}}>Listado de productos</span>
            </a>
          </li>

          <div className="sidebar-heading">
            Stock:
          </div>

          <li className="nav-item">
            <a className="nav-link" href=" " onClick={movimiento}>
              <FontAwesomeIcon icon={faTable} style={{color: "#ffffff",}} />
              <span style={{marginLeft:"10px"}}>Movimientos</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href=" " onClick={eliminacion}>
              <FontAwesomeIcon icon={faTable} style={{color: "#ffffff",}} />
              <span style={{marginLeft:"10px"}}>Bitácora Eliminación</span>
            </a>
          </li>


          

          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle" onClick={handleToggleSidebar}>
            <FontAwesomeIcon icon={faCircleDot} size ="2x" style={{color: "#ffffff",marginTop: "2px",marginLeft:"-1.5px"}} />
            </button>
          </div>
  </ul>

  <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <form className="form-inline">
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>
        </form>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
          <h2 className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleDropdown} style={{color: "#85929E"}}>
            Administrador
           <div className='img-logout'></div>
          </h2>

            <div className={`dropdown-menu ${showLogout ? 'show' : ''}`} aria-labelledby="navbarDropdown">
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href=" " onClick={handleLogout}>
              <div className='logout'><span>Cerrar sesión</span></div>
              </a>
            </div>
          </li>
        </ul>
      </nav>


      <div className="container-fluid">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                      <span className='titletable'>Bitácora de Eliminación de Productos Guatemala:</span> 
                  </div>
                  
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id Producto</th>
                                <th>Producto</th>
                                <th>Fecha Eliminación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data) ? (
                            data.map((product) => (
                                <tr key={product.id_producto}>
                                <td>{product.id_producto}</td>
                                <td>{product.nombre_producto}</td>
                                <td>{product.fecha}</td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="3">No se encontraron datos</td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                    </div>
                  </div>



                  <div className="container-fluid">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                      <span className='titletable'>Bitácora de Eliminación de Productos Jutiapa:</span> 
                  </div>
                  
                    <Table striped bordered hover>
                        <thead>
                           <tr>
                                <th>Id Producto</th>
                                <th>Producto</th>
                                <th>Fecha Eliminación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(data2) ? (
                            data2.map((products2) => (
                                <tr key={products2.id_producto}>
                                <td>{products2.id_producto}</td>
                                <td>{products2.nombre_producto}</td>
                                <td>{products2.fecha}</td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="3">No se encontraron datos</td>
                            </tr>
                            )}
          </tbody>
                    </Table>
                    </div>
                  </div>
                </div>
                </div>

      </div>
    );
}

export default BitacoraEliminar;