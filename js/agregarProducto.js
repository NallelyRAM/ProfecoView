const url = 'https://jsonplaceholder.typicode.com/users';
const respuesta = document.querySelector("#respuesta")
const btnAgregar = document.querySelector("#btnGuardar")
const tabla = document.querySelector("table tbody");

const idSupermercado = 5

document.addEventListener("DOMContentLoaded", mostrarProductos)

btnAgregar.addEventListener("click", agregarProducto)

async function mostrarProductos() {
    const respuesta = await fetch(url)
    const productos = await respuesta.json()
    //mostrarListaproductos(productos)
   // obtenerProductos()
}

async function agregarProducto() {
    const nombre = document.querySelector("#nombreProducto").value
    const marca = document.querySelector("#marcaProducto").value
    const precio = document.querySelector("#precioProducto").value
    const stock = document.querySelector("#stockProducto").value

    const producto = {
        //"id": Math.floor(Math.random() * 1000),
        "nombre": nombre,
        "marca": marca,
        "precio":precio,
        "stock":stock,
        //"supermercado":{
           // "id":idSupermercado
        //}
    }
    // este es para agregar productos a los supermercados
/**
    let idProductoAgregado = 0
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
      .then(response => response.json())
      .then(data => {
        idProductoAgregado = data.id
        console.log(data);
      })
      .catch(error => {
        // Manejar errores
        console.error('Error:', error);
        return
      });*/

    const fila = document.createElement("tr");
            //nombre
            //marca
            //precio
            //stock
            //SUPER SE TIENE CAMBIAR AUTO ↓↓↓↓↓↓
            fila.innerHTML = `
              <td>${producto.nombre}</td>
              <td>${producto.marca}</td>
              <td>${producto.precio}</td>
              <td>${producto.stock}</td>
                          <td><button data-id="${producto.id}" class="actualizar" href="myModal" class="btn btn-primary">Actualizar</button>
                              <button data-id="${producto.id}" class="eliminar" class="btn btn-danger">Eliminar</button></td>
            `;
            tabla.appendChild(fila);

    console.log(respuesta)
}


function obtenerProductos() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((producto) => {
        const fila = document.createElement("tr");
        //nombre
        //marca
        //precio
        //stock
        //SUPER SE TIENE CAMBIAR AUTO ↓↓↓↓↓↓
        fila.innerHTML = `
          <td>${producto.name}</td>
          <td>${producto.username}</td>
          <td>${producto.address.geo.lat}</td>
          <td>${producto.address.geo.lat}</td>
          <td style="margin-left=30px"><button data-id="${producto.id}" class="actualizar" data-toggle="modal" data-target="#myModalUpdate">Actualizar</button>
                <button data-id="${producto.id}" class="eliminar">Eliminar</button></td>

        `;
        tabla.appendChild(fila);
      });
    });
}


obtenerProductos();
//Obtener los detalles del prodcuto
tabla.addEventListener("click", (event) => {
  const botonDetalles = event.target.closest(".detalles");
  if (botonDetalles) {
    const idProducto = botonDetalles.dataset.id;
    mostrarDetalleProducto(idProducto);
  }
});

// Agregar event listener para el botón "Eliminar"
tabla.addEventListener('click', e => {
  if (e.target.classList.contains('eliminar')) {
    const idProducto = e.target.dataset.id;
    if (confirm(`¿Seguro que desea eliminar la oferta ${idProducto}?`)) {
      // Si el producto confirma que desea eliminar, enviar la solicitud DELETE a la API
      fetch(`https://jsonplaceholder.typicode.com/users/${idProducto}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            // Si la solicitud DELETE tiene éxito, eliminar la fila correspondiente de la tabla
            e.target.closest('tr').remove();
            alert(`La oferta ${idProducto} eliminado correctamente.`);
          } else {
            throw new Error('No se pudo eliminar la oferta.');
          }
        })
        .catch(error => alert(error.message));
    }
  }
});

// Agregar event listener para el botón "Actualizar"
// Agregar event listener para el botón "Actualizar"
tabla.addEventListener('click', e => {
  if (e.target.classList.contains('actualizar')) {
    const idProducto = e.target.dataset.id;
    // Realizar solicitud fetch para obtener los datos del producto
    fetch(`https://jsonplaceholder.typicode.com/users/${idProducto}`)
      .then(response => response.json())
      .then(producto => {
        // Llenar los campos del formulario con los datos del producto
        const formulario = document.querySelector('#formulario-actualizar');
        formulario.querySelector('#nombreProducto').value = producto.name;
        formulario.querySelector('#marcaProducto').value = producto.username;
        formulario.querySelector('#precioProducto').value = producto.address.geo.lat;
        formulario.querySelector('#stockProducto').value = producto.address.geo.lng;

        // Mostrar la ventana modal

        const modal = new bootstrap.Modal(document.querySelector('#myModal'));
        modal.show();
/**
          modal.classList.add("show");
          modal.classList.add("fade");
          document.body.classList.add("modal-open");*/

        // Agregar evento submit al formulario de la ventana modal
        formulario.addEventListener('submit', e => {
          e.preventDefault();
          // Crear objeto con los nuevos datos del producto
          const nuevoproducto = {
            name: formulario.querySelector('#nombreProducto').value,
            username: formulario.querySelector('#marcaProducto').value,
            address: {
              geo: {
                lat: formulario.querySelector('#precioProducto').value,
                lng: formulario.querySelector('#stockProducto').value
              }
            }
          };
          // Realizar solicitud fetch para actualizar los datos del producto
          fetch(`https://jsonplaceholder.typicode.com/users/${idProducto}`, {
            method: 'PUT',
            body: JSON.stringify(nuevoproducto),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(productoActualizado => {
              // Actualizar los datos del producto en la tabla
              const fila = e.target.closest('tr');
              fila.querySelector('td:nth-child(1)').textContent = productoActualizado.name;
              fila.querySelector('td:nth-child(2)').textContent = productoActualizado.username;
              fila.querySelector('td:nth-child(3)').textContent = productoActualizado.address.geo.lat;
              fila.querySelector('td:nth-child(4)').textContent = productoActualizado.address.geo.lng;
              // Cerrar la ventana modal
              //modal.style.display = 'none';
            });
        });
      });
  }
});


//ABRE OTRA PANTALLA DONDE OBTIENE LA INFORMACIÓN
function mostrarDetalleProducto(idProducto) {
  const url = `https://jsonplaceholder.typicode.com/users/${idProducto}`;
  fetch(url)
    .then((response) => response.json())
    .then((producto) => {
      const pantallaDetalles = window.open("", "Detalles", "width=400,height=400");
      pantallaDetalles.document.body.innerHTML = `
        <h1>${producto.name}</h1>
        <p><strong>Username:</strong> ${producto.username}</p>
        <p><strong>Email:</strong> ${producto.email}</p>
        <p><strong>Phone:</strong> ${producto.phone}</p>
        <p><strong>Website:</strong> ${producto.website}</p>
        <p><strong>Company:</strong> ${producto.company.name}</p>
        <p><strong>Address:</strong> ${producto.address.street}, ${producto.address.suite}, ${producto.address.city}, ${producto.address.zipcode}</p>
      `;
    });
}

function mostrarProductos(producto) {
    const fila = document.createElement('tr')
    fila.innerHTML = `
        <td>${producto.name}</td>
        <td>${producto.username}</td>
        <td>${producto.address.geo.lat}</td>
        <td>${producto.address.geo.lng}</td>
    `
    respuesta.appendChild(fila)
}


//F U N C I O N E S  P A R A  V A L I D A R

//F U N C I O N E S  P A R A  V A L I D A R 

/*
function validarTexto(texto) {
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(texto);
}
function validarNumeros(cadena) {
  const regex = /^\d{1,6}$/;
  return regex.test(cadena);

}

}*/
