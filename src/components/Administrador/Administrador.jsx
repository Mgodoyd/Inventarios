import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect,useRef} from 'react';
import '../Administrador/css/sb-admin-2.min.css';
import './img/undraw_profile_2.png';
import './css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLaughWink } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import Chart from "chart.js/auto";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';







const Administrador = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [stockGt, setStockGt] = useState(0);
  const [stockJt, setStockJt] = useState(0);
  const [stocktotal, setStocktotal] = useState(0);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [movimientosTotal2, setMovimientosTotal2] = useState(0);
  const [labels2, setLabels2] = useState(['A']);
  const [values2, setValues2] = useState([{ uv: 0 }]);
  const [movimientosTotal, setMovimientosTotal] = useState(0);
  const [labels1, setLabels1] = useState(['A']);
  const [values, setValues] = useState([{ uv: 0 }]);
  
  
  const handleToggleSidebar = () => {
    const sidebar = document.querySelector(".mySidebar");
    sidebar.classList.toggle("toggled");
  };
 
  useEffect(() => {
    const fetchStockGt = async () => {
      try {
        const response = await fetch('https://analisis-sistemas.azurewebsites.net/api/stocktotalgt', {
          method: 'GET',
        });
        const text = await response.text();
        console.log(text);
        const data = JSON.parse(text);
        setStockGt(data.total);
        
      } catch (error) {
        console.error(error);
        
      }
    };
  
    fetchStockGt();
  }, []);

  useEffect(() => {
    const fetchStockJt = async () => {
      try {
        const response = await fetch('https://analisis-sistemas.azurewebsites.net/api/stocktotaljt', {
          method: 'GET',
        });
        const text = await response.text();
        console.log(text);
        const data = JSON.parse(text);
        setStockJt(data.total);
        
      } catch (error) {
        console.error(error);
        
      }
    };
  
    fetchStockJt();
  }, []);
  
  useEffect(() => {
    const fetchStocktotal = async () => {
      try {
        const response = await fetch('https://analisis-sistemas.azurewebsites.net/api/totalstock2dbs', {
          method: 'GET',
        });
        const text = await response.text();
        console.log(text);
        const data = JSON.parse(text);
        setStocktotal(data.total);
        
      } catch (error) {
        console.error(error);
        
      }
    };
  
    fetchStocktotal();
  }, []);

  const tablespage = () => {
    navigate('tables');
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
  
   

    useEffect(() => {
      const chartInstance = new Chart(canvasRef.current, {
        type: "pie",
        data: {
          labels: ["Guatemala", "Jutiapa"],
          datasets: [
            {
              data: [stockGt, stockJt],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        },
      });
    
      return () => {
        chartInstance.destroy();
      };
    }, [stockGt, stockJt]);
    
    
   
   

    
    useEffect(() => {
      const intervalId = setInterval(() => {
        const fetchMovimientosTotalGt = async () => {
          try {
            const response = await fetch('https://analisis-sistemas.azurewebsites.net/api/movimientosgt', {
              method: 'GET',
            });
            const text = await response.text();
            const data = JSON.parse(text);
            setMovimientosTotal(data.total);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchMovimientosTotalGt();
      }, 200);
    
      return () => {
        clearInterval(intervalId);
      };
    }, [setMovimientosTotal]);
    
      useEffect(() => {
        const newValues = [...values];
        newValues.push({ uv: movimientosTotal });
        setValues(newValues);
      
        const newLabel = String.fromCharCode(labels1.length + 65);
        setLabels1([...labels1, newLabel]);
      }, [movimientosTotal, labels1, values]);
    
  
  
     
      useEffect(() => {
        const intervalId = setInterval(() => {
        const fetchMovimientosTotalJt = async () => {
          try {
            const response = await fetch('https://analisis-sistemas.azurewebsites.net/api/movimientos', {
              method: 'GET',
            });
            const text = await response.text();
            const data = JSON.parse(text);
            setMovimientosTotal2(data.total);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchMovimientosTotalJt();
      }, 200);
    
      return () => {
        clearInterval(intervalId);
      };
    }, [setMovimientosTotal]);
    
      useEffect(() => {
        const newValues = [...values2];
        newValues.push({ uv: movimientosTotal2 });
        setValues2(newValues);
      
        const newLabel = String.fromCharCode(labels2.length + 65);
        setLabels2([...labels2, newLabel]);
      }, [movimientosTotal2, labels2, values2]);

    
  /*  const actualizarMovimientos = (movimiento) => {
      setMovimientos([...movimientos, movimiento]);
    };*/
    

  return (
    <>
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
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Cantidad de producto bodega Guatemala</div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{stockGt}</div>
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
                      {stockJt}
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
                      {stocktotal}
                    </div>
                  </div>
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faCalendar} size="2x" style={{color: "#bababa",}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 style={{color:"black"}}>Estadistica Guatemala</h1>
           
          <div style={{ width: '25%', height: '50%',marginLeft:"75%"}}>
            <canvas ref={canvasRef} />
          </div>

         

          <div style={{ width: '75%', marginTop:"-405px"}}>
      <h2 style={{ fontSize: '20px' }}>Gráfica Guatemala</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={values}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ stroke: 'black', strokeWidth: 0.5 }} />
          <YAxis stroke='black' strokeWidth={0.5} />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#1E90FF" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    
    <div style={{ width: '75%', marginTop:"-218px",paddingTop:"2%" }}>
      <h2 style={{ fontSize: '20px' }}>Gráfica Jutiapa</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={values2}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ stroke: 'black', strokeWidth: 0.5 }} />
          <YAxis stroke='black' strokeWidth={0.5} />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="red" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>


        
              

         

        </div>
      </div>

      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Derechos Reservados © Mgodoyd 2023</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>
    </>
  );

}

export default Administrador;