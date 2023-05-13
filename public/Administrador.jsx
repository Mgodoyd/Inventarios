import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Administrador/css/sb-admin-2.min.css';
import './img/undraw_profile_2.png';
import './css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLaughWink } from '@fortawesome/free-solid-svg-icons';



const Administrador = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDropdown = () => {
    setShowLogout(!showLogout);
  }

  return (
    
     <>
     

      <div id="wrapper">
  <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
      <div className="sidebar-brand-icon rotate-n-15">
        <FontAwesomeIcon icon={ faLaughWink } size="2x" style={{color: "#ffffff",}} />
      </div>
      <div className="sidebar-brand-text mx-3">Inventario - SCRUM <sup>2</sup></div>
    </a>

    <hr className="sidebar-divider my-0" />

    <li className="nav-item active">
      <a className="nav-link" href="/">
        <FontAwesomeIcon icon={faAlternateTachometer} size="sm" style={{color: "#ffffff",}} />
        <span>Pantalla de inicio</span>
      </a>
    </li>

    <hr className="sidebar-divider" />

    <div className="sidebar-heading">
      Existencia:
    </div>

    <li className="nav-item">
      <a className="nav-link" href="/tables">
        <i className="fas fa-fw fa-table"></i>
        <span>Listado de productos</span>
      </a>
    </li>

    <hr className="sidebar-divider d-none d-md-block"></hr>

    <div className="text-center d-none d-md-inline">
      <button className="rounded-circle border-0" id="sidebarToggle"></button>
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
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a className="nav-link dropdown-toggle" href="/" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-search fa-fw"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"></input>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
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
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Inicio</h1>
        </div>

        <div className="row">
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Cantidad de producto bodega Guatemala
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      2,000
                    </div>
                  </div>
                  <div className="col-auto">
                   <FontAwesomeIcon icon={faCalendar} size="2x" style={{color: "#bababa",}} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Cantidad de producto bodega Jutiapa
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      1,000
                    </div>
                  </div>
                  <div className="col-auto">
                   <FontAwesomeIcon icon={faCalendar} size="2x" style={{color: "#bababa",}} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Total de existencias
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      3,000
                    </div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faCalendar} size="2x" style={{color: "#bababa",}} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Productos por marca:</h6>
            </div>
            <div className="card-body">
              <h4 className="small font-weight-bold"> <span className="float-right"></span></h4>
              <div className="progress mb-4">
                <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <h4 className="small font-weight-bold"> <span className="float-right"></span></h4>
              <div className="progress mb-4">
                <div className="progress-bar bg-warning" role="progressbar" style={{width: "40%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <h4 className="small font-weight-bold"> <span className="float-right"></span></h4>
              <div className="progress mb-4">
                <div className="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <h4 className="small font-weight-bold"> <span className="float-right"></span></h4>
              <div className="progress mb-4">
                <div className="progress-bar bg-info" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <h4 className="small font-weight-bold"> <span className="float-right"></span></h4>
              <div className="progress">
                <div className="progress-bar bg-success" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="card-body">
              <div className="chart-area">
                <canvas id="myAreaChart" alt=""></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Derechos Reservados © Tu sitio web 2023</span>
          </div>
        </div>
      </footer>
    </div>

    <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">¿Desea abandonar la sesión actual?</h5>
            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">Seleccione cerrar sesión para salir de su cuenta.</div>
          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
            <a className="btn btn-primary" href="/login">Cerrar sesión</a>
          </div>
        </div>
      </div>
    </div>

    <a className="scroll-to-top rounded" href="#page-top">
      <i className="fas fa-angle-up"></i>
    </a>
  </div>
</div>
    </>
  );

}

export default Administrador;