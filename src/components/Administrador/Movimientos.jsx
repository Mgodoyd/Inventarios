import React from 'react';
import  { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughWink } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import './img/undraw_profile_2.png';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import '../Administrador/css/sb-admin-2.min.css';
const Movimientos = () => {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([]); // Variable de estado para almacenar los datos obtenidos
    const [data2, setData2] = useState([]);


    useEffect(() => {
      fetch("https://analisis-sistemas.azurewebsites.net/api/getmovimientosgt")
        .then((response) => response.json())
        .then((data) => {
          setData(data); // Asignar los datos obtenidos a la variable de estado
          console.log(data);
        });
    }, []);

    useEffect(() => {
        fetch("https://analisis-sistemas.azurewebsites.net/api/getmovimientosjt")
          .then((response) => response.json())
          .then((data2) => {
            setData2(data2); // Asignar los datos obtenidos a la variable de estado
            console.log(data2);
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
      }
      const pageinicio = () => {
          navigate('/admin');
          };
  
      const movimiento = () => {
          navigate('/admin/movimientos');
          };

    return (
        <div id="wrapper">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion mySidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <FontAwesomeIcon icon={ faLaughWink } size="2x" style={{color: "#ffffff",}} />
            </div>
            <div className="sidebar-brand-text mx-3">Inventario - SCRUM <sup>2</sup></div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item active">
            <a className="nav-link" href=" " onClick={pageinicio}>
              <FontAwesomeIcon icon={faTachometerAlt} style={{color: "#ffffff",}} />
              <span style={{marginLeft:"10px"}}>Pantalla de inicio</span>
            </a>
          </li>

          <hr className="sidebar-divider" />

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


          <hr className="sidebar-divider d-none d-md-block"></hr>

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
                      <span className='titletable'>Movimientos Guatemala:</span> 
                  </div>
                  
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Id Producto</th>
                                <th>Usuario</th>
                                <th>Ubicación</th>
                                <th>Cantidad Movida</th>
                                <th>Almacén Enviando</th>
                                <th>Almacén Recibiendo</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((movimiento) => (
                            <tr key={movimiento.id_movimiento}>
                                <td>{movimiento.id_movimiento}</td>
                                <td>{movimiento.id_producto}</td>
                                <td>{movimiento.id_usuario === 1 ? "Operador" : "Administrador"}</td>
                                <td>{movimiento.id_ubicacion === 2 ? "Guatemala" : "Jutiapa"}</td>
                                <td>{movimiento.cantidad_movidad}</td>
                                <td>{movimiento.ubicacion_almacen_anterior}</td>
                                <td>{movimiento.ubicacion_almacen_nuevo}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </div>
                  </div>



                  <div className="container-fluid">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                      <span className='titletable'>Movimientos Jutiapa:</span> 
                  </div>
                  
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Id Producto</th>
                                <th>Usuario</th>
                                <th>Ubicación</th>
                                <th>Cantidad Movida</th>
                                <th>Almacén Enviando</th>
                                <th>Almacén Recibiendo</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data2.map((movimientos) => (
                            <tr key={movimientos.id_movimiento}>
                                <td>{movimientos.id_movimiento}</td>
                                <td>{movimientos.id_producto}</td>
                                <td>{movimientos.id_usuario === 1 ? "Operador" : "Administrador"}</td>
                                <td>{movimientos.id_ubicacion === 2 ? "Guatemala" : "Jutiapa"}</td>
                                <td>{movimientos.cantidad_movidad}</td>
                                <td>{movimientos.ubicacion_almacen_anterior}</td>
                                <td>{movimientos.ubicacion_almacen_nuevo}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    </div>
                  </div>
                </div>
                </div>

      </div>
        
    );
}

export default Movimientos;