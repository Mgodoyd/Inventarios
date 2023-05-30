import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughWink } from '@fortawesome/free-solid-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
//import '../Administrador/css/sb-admin-2.min.css';
import './img/undraw_profile_2.png';
import './css/style.css';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { faPlus  } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import {faFileExcel} from '@fortawesome/free-solid-svg-icons';

const Productslist = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [products, setProducts] = useState([]);
    const [products2, setProducts2] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    
    
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
          const transformedProducts = data.products.map((product) => {
            if (product.id_ubicacion === 2) {
              const base64String = convertByteArrayToBase64(product.img);
               return { ...product, ubicacion: "Guatemala", image: base64String };
            } else {
              return product;
            }
          });
    
          const transformedProducts2 = data.products2.map((products2) => {
           
            if (products2.id_ubicacion === 1) {
              const base64String = convertByteArrayToBase64(products2.img);
             // console.log(products2.img);
              return { ...products2, ubicacion: "Jutiapa", image: base64String };
            } else {
              return products2;
            }
          });
          setProducts(transformedProducts);
          setProducts2(transformedProducts2);
        });
    }, []);
    
    
    const eliminarProductoGT = (id) => {
      const producto = products.find(product => product.id_producto === id);


      if (!producto) {
        console.error('El producto no existe');
        return;
      }
    
      const { nombbre } = producto;
    
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Se eliminará el producto ${nombbre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://analisis-sistemas.azurewebsites.net/api/delete/gt/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              if (response.ok) {
                const updatedProducts = products.filter(product => product.id_producto !== id);
                setProducts(updatedProducts);
                Swal.fire({
                  icon: 'success',
                  title: 'Producto eliminado correctamente',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Producto relacionado a un movimiento',
                });
              }
            })
            .catch(error => {
              console.error(error);
              alert('Ha ocurrido un error al eliminar el producto.');
            });
        }
      });
    };
    
    
    const eliminarProductoJT = (id) => {
      const producto = products2.find(product => product.id_producto === id);


      if (!producto) {
        console.error('El producto no existe');
        return;
      }
    
      const { nombre } = producto;
    
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Se eliminará el producto ${nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://analisis-sistemas.azurewebsites.net/api/delete/jt/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              console.log(response);
              if (response.ok) {
                const updatedProducts = products.filter(product => product.id_producto !== id);
                setProducts(updatedProducts);
                Swal.fire({
                  icon: 'success',
                  title: 'Producto eliminado correctamente',
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Producto relacionado a un movimiento',
                });
              }
            })
            .catch(error => {
              console.error(error);
              alert('Ha ocurrido un error al eliminar el producto.');
            });
        }
      });
    };
    
    
    
    const filteredProducts = products.filter(product => {
      const nombre = product.nombbre ? product.nombbre.toLowerCase() : '';
      return nombre.includes(searchTerm.toLowerCase());
    });
    
    const filteredProducts2 = products2.filter(products2 => {
      const nombre = products2.nombre ? products2.nombre.toLowerCase() : '';
      return nombre.includes(searchTerm.toLowerCase());
    });
    
    const getProductoJt = async (id) => {
      const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/jt/${id}`);
      const data = await response.json();
      return data;
    };




    const actualizarProductoJt = async (id) => {
      try {
        const data = await getProductoJt(id);
    
        console.log(data);
    
        if (!data) {
          console.log('La respuesta es undefined o null');
          return;
        }
    
        const producto = data;
        const nombre = producto[0].nombbre;
        const precio = producto[0].precio;
        const img = producto[0].img;
        const stock = producto[0].stock;
        const stock_minimo = producto[0].stock_minimo;
    
        const filteredProduct = filteredProducts2.find(products2 => products2.id_producto === id);
    
        const { value: formValues } = await Swal.fire({
          title: 'Actualizar Producto',
          html:
          `<h3>Producto</h3>
           <input id="swal-input1" class="swal2-input" value="${nombre}" readonly required>
           <h3>Precio</h3>
           <input id="swal-input2" class="swal2-input" value="${precio}" required>
           <h3>Stock</h3>
           <input id="swal-input3" class="swal2-input" value="${stock}" required>
           <h3>Stock Minimo</h3>
           <input id="swal-input4" class="swal2-input" value="${stock_minimo}" required>
           <h3>Imagen</h3>
           <img src="data:image/png;base64,${filteredProduct.image}" alt="Imagen del producto" style="max-width: 200px;">
           <input id="swal-input5" type="file" accept="image/png" value="${img}">
    
    
        `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          confirmButtonClass: 'my-confirm-button-class',
          cancelButtonClass: 'my-cancel-button-class',
          buttonsStyling: false,
          preConfirm: async () => {
            const reader = new FileReader();
            const file = document.getElementById('swal-input5').files[0];
          
            if (!file) {
              const input1 = document.getElementById('swal-input1');
              const input2 = document.getElementById('swal-input2');
              const input3 = document.getElementById('swal-input3');
              const input4 = document.getElementById('swal-input4');
          
              if (!input1.value || !input2.value || !input3.value || !input4.value) {
                Swal.showValidationMessage('Llena todos los campos requeridos!');
                return false; // Rechazar la promesa si faltan campos requeridos
              }
          
              return [
                input1.value,
                input2.value,
                input3.value,
                input4.value,
                filteredProduct.image // Utilizar la imagen existente
              ];
            }
          
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
          
            if (fileExtension !== 'png') {
              Swal.showValidationMessage('Por favor, selecciona un archivo PNG.');
              return false; // Rechazar la promesa si no es un archivo PNG válido
            }
          
            reader.readAsDataURL(file);
          
            return new Promise((resolve, reject) => {
              reader.onload = () => {
                const base64Image = reader.result.split(',')[1];
                const input1 = document.getElementById('swal-input1');
                const input2 = document.getElementById('swal-input2');
                const input3 = document.getElementById('swal-input3');
                const input4 = document.getElementById('swal-input4');
          
                if (!input1.value || !input2.value || !input3.value || !input4.value) {
                  Swal.showValidationMessage('Llena todos los campos requeridos!');
                  reject();
                } else {
                  resolve([
                    input1.value,
                    input2.value,
                    input3.value,
                    input4.value,
                    base64Image
                  ]);
                }
              };
              reader.onerror = () => {
                reader.abort();
                reject(new Error('Error al cargar la imagen'));
              };
            });
          }
        });
    
        if (formValues) {
          const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/update/jt/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              "NOMBRE": formValues[0],
              "PRECIO": formValues[1],
              "IMG": formValues[4],
              "STOCK": formValues[2],
              "STOCK_MINIMO": formValues[3]
            }),            
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(response);
          if (response.ok) {
            Swal.fire({
              title: '¡Éxito!',
              text: 'El producto ha sido actualizado correctamente.',
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
              text: 'No se pudo actualizar el producto.',
              icon: 'error'
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    


    
    const getProductoGT = async (id) => {
      const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/gt/${id}`);
      const data = await response.json();
      return data;
    };



    const actualizarProducto = async (id) => {
      try {
        const data1 = await getProductoGT(id);
    
        console.log(data1);
    
        if (!data1) {
          console.log('La respuesta es undefined o null');
          return;
        }
        const filteredProduct = filteredProducts.find(product => product.id_producto === id);
    
        const producto = data1;
        const nombre = producto[0].nombbre;
        const precio = producto[0].precio;
        const img = producto[0].img;
        const stock = producto[0].stock;
        const stock_minimo = producto[0].stock_minimo;
    

    
        const { value: formValues } = await Swal.fire({
          title: 'Actualizar Producto',
          html:
           `<h3>Producto</h3>
           <input id="swal-input1" class="swal2-input" value="${nombre}" readonly required>
           <h3>Precio</h3>
           <input id="swal-input2" class="swal2-input" value="${precio}" required>
           <h3>Stock</h3>
           <input id="swal-input3" class="swal2-input" value="${stock}" required>
           <h3>Stock Minimo</h3>
           <input id="swal-input4" class="swal2-input" value="${stock_minimo}" required>
           <h3>Imagen</h3>
           <img src="data:image/png;base64,${filteredProduct.image}" alt="Imagen del producto" style="max-width: 200px;">
           <input id="swal-input5" type="file" accept="image/png" value="${img}">
          
        
        `,
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          confirmButtonClass: 'my-confirm-button-class',
          cancelButtonClass: 'my-cancel-button-class',
          buttonsStyling: false,
          preConfirm: async () => {
            const reader = new FileReader();
            const file = document.getElementById('swal-input5').files[0];
          
            if (!file) {
              const input1 = document.getElementById('swal-input1');
              const input2 = document.getElementById('swal-input2');
              const input3 = document.getElementById('swal-input3');
              const input4 = document.getElementById('swal-input4');
          
              if (!input1.value || !input2.value || !input3.value || !input4.value) {
                Swal.showValidationMessage('Llena todos los campos requeridos!');
                return false; // Rechazar la promesa si faltan campos requeridos
              }
          
              return [
                input1.value,
                input2.value,
                input3.value,
                input4.value,
                filteredProduct.image // Utilizar la imagen existente
              ];
            }
          
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
          
            if (fileExtension !== 'png') {
              Swal.showValidationMessage('Por favor, selecciona un archivo PNG.');
              return false; // Rechazar la promesa si no es un archivo PNG válido
            }
          
            reader.readAsDataURL(file);
          
            return new Promise((resolve, reject) => {
              reader.onload = () => {
                const base64Image = reader.result.split(',')[1];
                const input1 = document.getElementById('swal-input1');
                const input2 = document.getElementById('swal-input2');
                const input3 = document.getElementById('swal-input3');
                const input4 = document.getElementById('swal-input4');
          
                if (!input1.value || !input2.value || !input3.value || !input4.value) {
                  Swal.showValidationMessage('Llena todos los campos requeridos!');
                  reject();
                } else {
                  resolve([
                    input1.value,
                    input2.value,
                    input3.value,
                    input4.value,
                    base64Image
                  ]);
                }
              };
              reader.onerror = () => {
                reader.abort();
                reject(new Error('Error al cargar la imagen'));
              };
            });
          }
        });
        
        if (formValues) {
          const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/update/gt/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              "NOMBRE": formValues[0],
              "PRECIO": formValues[1],
              "IMG": formValues[4],
              "STOCK": formValues[2],
              "STOCK_MINIMO": formValues[3]
            }),
            
            headers: {
              'Content-Type': 'application/json'
            }
          });
        console.log(response);
          if (response.ok) {
            Swal.fire({
              title: '¡Éxito!',
              text: 'El producto ha sido actualizado correctamente.',
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
              text: 'No se pudo actualizar el producto.',
              icon: 'error'
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }



     
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
    
    




    const insertProducts = async () => {
      try {
        const { value: formValues } = await Swal.fire({
          title: 'Insertar Producto',
          html: `
            <h3>Producto</h3>
            <input id="swal-input1" class="swal2-input" required>
            <h3>Precio</h3>
            <input id="swal-input2" class="swal2-input" required>
            <h3>Stock</h3>
            <input id="swal-input3" class="swal2-input" required>
            <h3>Stock Minimo</h3>
            <input id="swal-input4" class="swal2-input" required>
            <h3>Imagen</h3>
            <input id="swal-input5" type="file" accept="image/png">
            <h2>Insertar en...?</h2>
            <input id="swal-input6" type="checkbox" name="tipo" value="gt">
            <label for="swal-input6">GT</label>
            <input id="swal-input7" type="checkbox" name="tipo" value="jt">
            <label for="swal-input7">JT</label>`,
          didOpen: () => {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
              checkbox.addEventListener('change', () => {
                const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
                if (checkedCount > 1) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Solo puedes seleccionar una ubicación',
                  });
                  checkbox.checked = false;
                }
              });
            });
          },
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          confirmButtonClass: 'my-confirm-button-class',
          cancelButtonClass: 'my-cancel-button-class',
          buttonsStyling: false,
          preConfirm: async () => {
            const reader = new FileReader();
            const file = document.getElementById('swal-input5').files[0];
          
            if (!file) {
              const input1 = document.getElementById('swal-input1');
              const input2 = document.getElementById('swal-input2');
              const input3 = document.getElementById('swal-input3');
              const input4 = document.getElementById('swal-input4');
              
              if (!input1.value || !input2.value || !input3.value || !input4.value) {
                Swal.showValidationMessage('Llena todos los campos requeridos!', {
                  timer: 3000 // Tiempo en milisegundos (3 segundos en este caso)
                });
                return false; // Rechazar la promesa si faltan campos requeridos
              }
          
              Swal.showValidationMessage('Selecciona una imagen!');
              return false; // Rechazar la promesa si no se selecciona una imagen
            }
          
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
          
            if (fileExtension !== 'png') {
              Swal.showValidationMessage('Por favor, selecciona un archivo PNG.');
              return false; // Rechazar la promesa si no es un archivo PNG válido
            }
          
            reader.readAsDataURL(file);
            // Devuelve una promesa que resuelve con el resultado una vez que la imagen se ha cargado
            return new Promise((resolve, reject) => {
              reader.onload = () => {
                const base64Image = reader.result.split(',')[1];
                const input1 = document.getElementById('swal-input1');
                const input2 = document.getElementById('swal-input2');
                const input3 = document.getElementById('swal-input3');
                const input4 = document.getElementById('swal-input4');
                const checkbox1 = document.getElementById('swal-input6');
                const checkbox2 = document.getElementById('swal-input7');
          
                if (!input1.value || !input2.value || !input3.value || !input4.value) {
                  Swal.showValidationMessage('Llena todos los campos requeridos!');
                  reject();
                } else {
                  resolve([
                    input1.value,
                    input2.value,
                    input3.value,
                    input4.value,
                    base64Image,
                    checkbox1.checked,
                    checkbox2.checked
                  ]);
                }
              };
          
              reader.onerror = () => {
                reader.abort();
                reject(new Error('Error al cargar la imagen'));
              };
            });
          },
        });
    
        if (formValues) {
          if (document.getElementById('swal-input6').checked) {
            const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/insert/gt`, {
              method: 'POST',
              body: JSON.stringify({
                "NOMBRE": formValues[0],
                "PRECIO": formValues[1],
                "IMG": formValues[4],
                "STOCK": formValues[2],
                "STOCK_MINIMO": formValues[3]
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            console.log(response);
        
            if (response.ok) {
              Swal.fire({
                title: '¡Éxito!',
                text: 'El producto ha sido insertado correctamente.',
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
                text: 'No se pudo insertar el producto.',
                icon: 'error'
              });
            }
          } else if (document.getElementById('swal-input7').checked) {
            const response = await fetch(`https://analisis-sistemas.azurewebsites.net/api/insert/jt`, {
              method: 'POST',
              body: JSON.stringify({
                "NOMBRE": formValues[0],
                "PRECIO": formValues[1],
                "IMG": formValues[4],
                "STOCK": formValues[2],
                "STOCK_MINIMO": formValues[3]
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            console.log(response);
        
            if (response.ok) {
              Swal.fire({
                title: '¡Éxito!',
                text: 'El producto ha sido insertado correctamente.',
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
                text: 'No se pudo insertar el producto.',
                icon: 'error'
              });
            }
          }
        }
    
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: '¡Error!',
          text: 'Producto ya existente.',
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
    

    const generarReporteGt = async () => {
      try {
        // Obtiene los datos de tu base de datos
        const response = await fetch('https://analisis-sistemas.azurewebsites.net/api/getproductsgt', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la base de datos');
        }
    
        const data = await response.json();
    
        // Elimina la propiedad "img" de cada objeto en el array de datos
        const dataWithoutImages = data.map(({ img, ...rest }) => rest);
    
        // Crea una hoja de cálculo de Excel
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataWithoutImages);
    
        // Agrega la hoja de cálculo al libro
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    
        // Genera el archivo Excel en formato de buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
        // Convierte el buffer en un objeto Blob
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        // Crea un objeto URL para el Blob
        const excelUrl = URL.createObjectURL(excelBlob);
    
        // Crea un enlace de descarga
        const downloadLink = document.createElement('a');
        downloadLink.href = excelUrl;
        downloadLink.download = 'reporteGt.xlsx';
    
        // Agrega el enlace al DOM
        document.body.appendChild(downloadLink);
    
        // Simula un clic en el enlace de descarga para iniciar la descarga
        downloadLink.click();
    
        // Remueve el enlace del DOM después de un tiempo para limpiar
        setTimeout(() => {
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(excelUrl);
        }, 100);
    
      } catch (error) {
        console.error(error);
        console.log(error.message);
        // Manejo del error en caso de que ocurra alguna falla en la obtención de datos o generación del archivo
      }
    };
    

    const generarReporteJt = async () => {
      try {
        // Obtiene los datos de tu base de datos
        const response = await fetch('https://analisis-sistemas.azurewebsites.net/api/getproductsjt', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la base de datos');
        }
    
        const data = await response.json();
    
        // Elimina la propiedad "img" de cada objeto en el array de datos
        const dataWithoutImages = data.map(({ img, ...rest }) => rest);
    
        // Crea una hoja de cálculo de Excel
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataWithoutImages);
    
        // Agrega la hoja de cálculo al libro
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    
        // Genera el archivo Excel en formato de buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
        // Convierte el buffer en un objeto Blob
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
        // Crea un objeto URL para el Blob
        const excelUrl = URL.createObjectURL(excelBlob);
    
        // Crea un enlace de descarga
        const downloadLink = document.createElement('a');
        downloadLink.href = excelUrl;
        downloadLink.download = 'reporteJt.xlsx';
    
        // Agrega el enlace al DOM
        document.body.appendChild(downloadLink);
    
        // Simula un clic en el enlace de descarga para iniciar la descarga
        downloadLink.click();
    
        // Remueve el enlace del DOM después de un tiempo para limpiar
        setTimeout(() => {
          document.body.removeChild(downloadLink);
          URL.revokeObjectURL(excelUrl);
        }, 100);
    
      } catch (error) {
        console.error(error);
        console.log(error.message);
        // Manejo del error en caso de que ocurra alguna falla en la obtención de datos o generación del archivo
      }
    };
    
    
    
    
    


    
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

    const eliminacion = () => {
        navigate('/admin/bitacora');
        };
   
    return (
        <>
        <div id="wrapper">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion mySidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <FontAwesomeIcon icon={ faLaughWink } size="2x" style={{color: "#ffffff",}} />
            </div>
            <div className="sidebar-brand-text mx-3">   Inventario - SCRUM<sup>2</sup></div>
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
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                      <span className='titletable'>Listado de productos:</span> 
                      <button className='buttoninsert' onClick={insertProducts}>
                        <FontAwesomeIcon icon={faUpload} style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff","margin-top": "2px","margin-left": "3px"}} />
                        Ingresar Producto
                      </button>
                 <Form>
                 


                 <Form.Group id="form-search" className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                </Form.Group>


                    </Form>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                    <button className='buttonreporte' onClick={ generarReporteGt}>
                        <FontAwesomeIcon icon={faFileExcel}  style={{ color: "#ffffff" }} /> 
                         Reporte GT
                    </button>
                    <button className='buttonreportejt' onClick={ generarReporteJt}>
                        <FontAwesomeIcon icon={faFileExcel}  style={{ color: "#ffffff" }} /> 
                         Reporte JT
                    </button>
                    {filteredProducts.length > 0 || filteredProducts2.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Stock-Disponible</th>
                                <th>Stock-Minimo</th>
                                <th>Almacén</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr>
                                    <td>{product.id_producto}</td>
                                    <td>{product.nombbre}</td>
                                    <td>Q.{product.precio}.00</td>
                                    <td>{product.stock <= product.stock_minimo ? <span style={{ color: 'red' }}>Stock mínimo alcanzado: {product.stock}</span> : product.stock}</td>
                                    <td>{product.stock_minimo}</td>
                                    <td>{product.id_ubicacion === 2 ? "Guatemala" : "Jutiapa"}</td>
                                    <td className='column-accion'>
                                        <button className='buttonactualizar' onClick={()=> actualizarProducto(product.id_producto)}>
                                            <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffffff"}} />
                                            Actualizar
                                        </button>
                                        <button className='buttoneliminar'  onClick={() => eliminarProductoGT(product.id_producto)}>
                                            <FontAwesomeIcon icon={faTrash} style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff"}} />
                                            Eliminar
                                        </button>
                                        <button className='buttonstock' onClick={() => MovimientoStock(product.id_producto)}>
                                            <FontAwesomeIcon icon={faPlus} style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff"}} />
                                            Stock
                                        </button>
                                        <button className='buttonstock2' onClick={() => enviarProductoGt(product.id_producto)}>
                                        <FontAwesomeIcon icon={faPaperPlane}  style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff"}} />
                                            Enviar Cliente 
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tbody> 
                        {filteredProducts2.map((products2) => (
                                <tr>
                                    <td>{products2.id_producto}</td>
                                    <td>{products2.nombre}</td>
                                    <td>Q.{products2.precio}.00</td>
                                    <td>{products2.stock <= products2.stock_minimo ? <span style={{ color: 'red' }}>Stock mínimo alcanzado: {products2.stock}</span> : products2.stock}</td>
                                    <td>{products2.stock_minimo}</td>
                                    <td>{products2.id_ubicacion === 2 ? "Guatemala" : "Jutiapa"}</td>
                                    <td className='column-accion'>
                                        <button className='buttonactualizar' onClick={()=> actualizarProductoJt(products2.id_producto)}>
                                            <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffffff"}} />
                                            Actualizar
                                        </button>
                                        <button className='buttoneliminar'  onClick={() => eliminarProductoJT(products2.id_producto)}>
                                            <FontAwesomeIcon icon={faTrash} style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff"}} />
                                            Eliminar
                                        </button>
                                        <button className='buttonstock' onClick={() => MovimientoStockJt(products2.id_producto)}>
                                            <FontAwesomeIcon icon={faPlus} style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff"}} />
                                            Stock
                                        </button>
                                        <button className='buttonstock3' onClick={() => enviarProductoJt(products2.id_producto)}>
                                            <FontAwesomeIcon icon={faPaperPlane}  style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff"}} />
                                            Enviar Cliente
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    ) : (
                      <p style={{fontSize:"1.5rem",textAlign:"center"}}>Producto no encontrado...</p>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Mgodoyd 2023
                  </span>
                </div>
              </div>
            </footer>
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
        </>
      );
    }
    
    export default Productslist;