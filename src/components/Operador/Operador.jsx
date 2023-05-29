import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { faLaughWink } from '@fortawesome/free-solid-svg-icons';
import './css/styleoperador.css'
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Operador = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  
 
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  }
  
  const handleToggleSidebar = () => {
    const sidebar = document.querySelector(".mySidebar");
    sidebar.classList.toggle("toggled");
  };
  

  const handleDropdown = () => {
    setShowLogout(!showLogout);
  }
  const filteredProducts = products.filter(product => {
    const nombre = product.nombbre ? product.nombbre.toLowerCase() : '';
    return nombre.includes(searchTerm.toLowerCase());
  });
  
  const filteredProducts2 = products2.filter(products2 => {
    const nombre = products2.nombre ? products2.nombre.toLowerCase() : '';
    return nombre.includes(searchTerm.toLowerCase());
  });


  

  const convertByteArrayToBase64 = (byteArray) => {
    const bytes = new Uint8Array(byteArray);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  


useEffect(() => {
  fetch("https://analisis-sistemas.azurewebsites.net/api/getproducts")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // muestra los datos obtenidos en consola
      const transformedProducts = data.products.map(product => {
        if (product.id_ubicacion === 2) {
         // console.log(product.img);
          const base64String = convertByteArrayToBase64(product.img);
          return { ...product, ubicacion: "Guatemala", image: base64String };
        } else {
          return product;
        }
      });
      const transformedProducts2 = data.products2.map(products2 => {
        if (products2.id_ubicacion === 1) {
          const base64String = convertByteArrayToBase64(products2.img);
          return { ...products2, ubicacion: "Jutiapa", image: base64String };
        } else {
          return products2;
        }
      });
      setProducts(transformedProducts);
      setProducts2(transformedProducts2);
    });
}, []);

  
  /*const decodeToImage = (imageString) => {
    const decodedData = atob(imageString);
    const uint8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };*/

  const getProductoGT = async (id) => {
    const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/gt/${id}`);
    const data = await response.json();
    return data;
  };


  const MovimientoStock = async (id) => {
    try {
      const data1 = await getProductoGT(id);
  
      console.log(data1);
  
      let stockresto = 0;
  
      if (!data1) {
        console.log('La respuesta es undefined o null');
        return;
      }
  
      const { value: formValues } = await Swal.fire({
        title: 'Stock a Enviar',
        html: `
          <input id="swal-input1" class="swal2-input" value="${stockresto}" required>
        `,
        focusConfirm: false,
        preConfirm: () => {
          stockresto = document.getElementById('swal-input1').value;
          return [stockresto];
        }
      });
  
      console.log(formValues);
  
      const stockDisponible = data1[0].stock;
      console.log(stockDisponible);
  
      if (parseInt(stockresto) <= stockDisponible) {
        console.log(stockresto);
        const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/gtdel/${id}?stockresto=${stockresto}`, {
          method: 'DELETE',
        });
  
        if (response.status !== 404) {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Movimiento de Stock correctamente.',
            icon: 'success'
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log(response);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'No existe stock para enviar',
            icon: 'error'
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Stock insuficiente',
          icon: 'error'
        });
      }
  
      //  window.location.reload();
    //  console.log(response);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'error!',
        text: 'No se pudo realizar el movimiento de stock.',
        icon: 'error'
      });
    }
  };

  const getProductoJt = async (id) => {
    const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/jt/${id}`);
    const data = await response.json();
    return data;
  };


  const MovimientoStockJt = async (id) => {
    try {
      const data1 = await getProductoJt(id);

      console.log(data1);

      let stockresto = 0;

      if (!data1) {
        console.log('La respuesta es undefined o null');
        return;
      }

      const { value: formValues } = await Swal.fire({
        title: 'Stock a Enviar',
        html: `
          <input id="swal-input1" class="swal2-input" value="${stockresto}" required>
        `,
        focusConfirm: false,
        preConfirm: () => {
          stockresto = document.getElementById('swal-input1').value;
          return [stockresto];
        }
      });
  
      console.log(formValues);

      const stockDisponible = data1[0].stock;
      console.log(stockDisponible);
  
      if (parseInt(stockresto) <= stockDisponible) {

      const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/jtdel/${id}?stockresto=${stockresto}`, {
        method: 'DELETE',
      });
      if (response.status !== 404) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Movimiento de Stock correctamente.',
          icon: 'success'
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        console.log(response);
      }else{
        Swal.fire({
          title: 'error!',
          text: 'No existe stock para Enviar',
          icon: 'error'
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Stock insuficiente',
        icon: 'error'
      });
    }
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'error!',
        text: 'No se pudo realizar el movimiento de stock.',
        icon: 'error'
      });
      
    }

  }


 
  const enviarProductoGt = async (id) => {

    const data1 = await getProductoGT(id);

    console.log(data1);

    

    if (!data1) {
      console.log('La respuesta es undefined o null');
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: 'Enviar Producto a Cliente',
      html: `
        <input id="swal-input1" class="swal2-input" required>
      `,
    });

    console.log(formValues);
  
    const cantidad = document.getElementById('swal-input1').value;
  
    try {

      const stockDisponible = data1[0].stock;
      console.log(stockDisponible);
      if (parseInt(cantidad) <= stockDisponible) {
      const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/stockgt/${id}?cantidad=${cantidad}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(response);
      
      if (response.ok) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Productos Envidados a Cliente.',
          icon: 'success'
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      } else {
        const errorData = await response.json();
        // Aquí puedes hacer algo con el objeto `errorData` que contiene información detallada sobre el error
        console.error('Error:', errorData);
  
        Swal.fire({
          title: '¡Error!',
          text: 'No se pudo enviar los productos.',
          icon: 'error'
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Stock insuficiente',
        icon: 'error'
      });
    }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: '¡Error!',
        text: 'No hay stock disponible para enviar.',
        icon: 'error'
      });
    }
  };

  
    const enviarProductoJt = async (id) => {

      const data1 = await getProductoJt(id);

      console.log(data1);

    

      if (!data1) {
        console.log('La respuesta es undefined o null');
        return;
      }
  
      const { value: formValues } = await Swal.fire({
        title: 'Enviar Producto a Cliente',
        html: `
          <input id="swal-input1" class="swal2-input" required>
        `,
      });
     
      console.log(formValues);
      const cantidad = document.getElementById('swal-input1').value;
    
      try {
        const stockDisponible = data1[0].stock;
        console.log(stockDisponible);
        if (parseInt(cantidad) <= stockDisponible) {
        const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/stockjt/${id}?cantidad=${cantidad}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log(response);
        
        if (response.ok) {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Productos Envidados a Cliente.',
            icon: 'success'
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);

        } else {
          const errorData = await response.json();
          // Aquí puedes hacer algo con el objeto `errorData` que contiene información detallada sobre el error
          console.error('Error:', errorData);
    
          Swal.fire({
            title: '¡Error!',
            text: 'No se pudo enviar los productos.',
            icon: 'error'
          });
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Stock insuficiente',
          icon: 'error'
        });
      }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: '¡Error!',
          text: 'No hay stock disponible para enviar.',
          icon: 'error'
        });
      }
    };



  return (
      <>
      <div id="wrapper">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion mySidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <FontAwesomeIcon icon={ faLaughWink } size="2x" style={{color: "#ffffff",}} />
            </div>
            <div className="sidebar-brand-text mx-3"> Inventario - SCRUM<sup>2</sup></div>
          </a>

          <hr className="sidebar-divider my-0" />

          

          <hr className="sidebar-divider" />

          <div className="sidebar-headingop">
            Existencia:
          </div>

          <li className="nav-item">
            <a className="nav-link" href=" " >
              <FontAwesomeIcon icon={faTable} style={{color: "#ffffff",}} />
              <span style={{marginLeft:"10px"}}>Listado de productos</span>
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
            Operador
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
      </div>
      <div className="container-fluid">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                      <span className='titletable'>Listado de productos:</span> 
                      
                 <Form>
                    <Form.Group  id="form-search" className="mb-3" controlId="formBasicEmail">
                        <Form.Control  type="text" placeholder=" Search..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                    </Form.Group>
                    </Form>
                  </div>
                  <div className="cards_total">
      {filteredProducts.map(product => (
        <div className="cards" key={product.id}>
          
         <img className='imgcard'
                src={`data:image/png;base64,${product.image}`}
                alt={product.nombre}
                onError={() => console.log("Error al cargar la imagen")}
              />
          <h2>Producto : {product.nombbre}</h2>
          <p>Precio : Q {product.precio}.00</p>
          <p>
            {product.stock <= product.stock_minimo ? (
              <p style={{ color: 'red' }}>Stock Disponible: {product.stock}</p>
            ) : (
              <p>Stock Disponible: {product.stock}</p>
            )}
          </p>
          <p>Almacén : {product.id_ubicacion === 2 ? "Guatemala" : "Jutiapa"}</p>
          <button className="updatestock" onClick={() => MovimientoStock(product.id_producto)}>Enviar stock</button>
          <button className='buttonstockoperador' onClick={() => enviarProductoGt(product.id_producto)}>
                                        <FontAwesomeIcon icon={faPaperPlane}  style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff"}} />
                                            Enviar Cliente
                                        </button>
        </div>
      ))}
      {filteredProducts2.map(products2 => (
        <div className="cards" key={products2.id}>
          
              <img className='imgcard'
                src={`data:image/png;base64,${products2.image}`}
                alt={products2.nombre}
                key={products2.id}
                onError={() => console.log("Error al cargar la imagen")}
              />
          <h2>Producto : {products2.nombre}</h2>
          <p>Precio : Q {products2.precio}.00</p>
          <p>
            {products2.stock <= products2.stock_minimo ? (
              <p style={{ color: 'red' }}>Stock Disponible: {products2.stock}</p>
            ) : (
              <p>Stock Disponible: {products2.stock}</p>
            )}
          </p>
          <p>Almacén : {products2.id_ubicacion === 2 ? "Guatemala" : "Jutiapa"}</p>
          <button className="updatestock" onClick={() => MovimientoStockJt(products2.id_producto)}>Enviar stock</button>
          <button className='buttonstockoperador' onClick={() => enviarProductoJt(products2.id_producto)}>
                                        <FontAwesomeIcon icon={faPaperPlane}  style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff"}} />
                                            Enviar Cliente
                                        </button>
        </div>
      ))}
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

    </>
  );
}

export default Operador;