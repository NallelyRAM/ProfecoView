const url = 'https://jsonplaceholder.typicode.com/users';
const respuesta = document.querySelector("#respuesta")
const btnAgregar = document.querySelector("#botonGuardar")
const tabla = document.querySelector("table tbody");

const idSupermercado = 5

document.addEventListener("DOMContentLoaded", mostrarUsuarios)

btnAgregar.addEventListener("click", agregarUsuario)

async function mostrarUsuarios() {
    const respuesta = await fetch(url)
    const usuarios = await respuesta.json()
    //mostrarListaUsuarios(usuarios)
   // obtenerUsuarios()
}

async function agregarUsuario() {
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
       /**     fila.innerHTML = `
              <td>${producto.nombre}</td>
              <td>${producto.marca}</td>
              <td>${producto.precio}</td>
              <td>${producto.stock}</td>
                          <td><button data-id="${producto.id}" class="actualizar" href="myModal" class="btn btn-primary">Actualizar</button>
                              <button data-id="${producto.id}" class="eliminar" class="btn btn-danger">Eliminar</button></td>
            `;
            tabla.appendChild(fila);*/


            const nombreValido = validarTexto(producto.nombre);
            const marcaValida = validarTexto(producto.marca);
            const precioValido = validarNumeros(producto.precio);
            const stockValido = validarNumeros(producto.stock);

            if (nombreValido && marcaValida && precioValido && stockValido) {
              const fila = document.createElement("tr");

              fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.marca}</td>
                <td>${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>
                  <button data-id="${producto.id}" class="actualizar" href="myModal" class="btn btn-primary">Actualizar</button>
                  <button data-id="${producto.id}" class="eliminar" class="btn btn-danger">Eliminar</button>
                </td>
              `;

              tabla.appendChild(fila);
            }


    console.log(respuesta)
}



function obtenerUsuarios() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((usuario) => {
        const fila = document.createElement("tr");
        //nombre
        //marca
        //precio
        //stock
        //SUPER SE TIENE CAMBIAR AUTO ↓↓↓↓↓↓
        fila.innerHTML = `
          <td>${usuario.name}</td>
          <td>${usuario.username}</td>
          <td>${usuario.address.geo.lat}</td>
          <td>${usuario.address.geo.lat}</td>
          <td style="margin-left=30px"><button data-id="${usuario.id}" class="actualizar" data-toggle="modal" data-target="#myModalUpdate">Actualizar</button>
                <button data-id="${usuario.id}" class="eliminar">Eliminar</button></td>

        `;
        tabla.appendChild(fila);
      });
    });
}


obtenerUsuarios();


// Agregar event listener para el botón "Eliminar"
tabla.addEventListener('click', e => {
  if (e.target.classList.contains('eliminar')) {
    const idUsuario = e.target.dataset.id;
    if (confirm(`¿Seguro que desea eliminar la oferta ${idUsuario}?`)) {
      // Si el usuario confirma que desea eliminar, enviar la solicitud DELETE a la API
      fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            // Si la solicitud DELETE tiene éxito, eliminar la fila correspondiente de la tabla
            e.target.closest('tr').remove();
            alert(`La oferta ${idUsuario} eliminado correctamente.`);
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
    const idUsuario = e.target.dataset.id;
    // Realizar solicitud fetch para obtener los datos del usuario
    fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}`)
      .then(response => response.json())
      .then(usuario => {
        // Llenar los campos del formulario con los datos del usuario
        const formulario = document.querySelector('#formulario-actualizar');
        formulario.querySelector('#nombreProductoActualizar').value = usuario.name;
        formulario.querySelector('#marcaProductoActualizar').value = usuario.username;
        formulario.querySelector('#precioProductoActualizar').value = usuario.address.geo.lat;
        formulario.querySelector('#stockProductoActualizar').value = usuario.address.geo.lng;

        // Mostrar la ventana modal

        const modal = new bootstrap.Modal(document.querySelector('#myModalUpdate'));
        modal.show();
/**
          modal.classList.add("show");
          modal.classList.add("fade");
          document.body.classList.add("modal-open");*/

        // Agregar evento submit al formulario de la ventana modal
        formulario.addEventListener('submit', e => {
          e.preventDefault();
          // Crear objeto con los nuevos datos del usuario
          /**
          const nuevoUsuario = {
            name: formulario.querySelector('#nombreProductoActualizar').value,
            username: formulario.querySelector('#marcaProductoActualizar').value,
            address: {
              geo: {
                lat: formulario.querySelector('#precioProductoActualizar').value,
                lng: formulario.querySelector('#stockProductoActualizar').value
              }
            }
          };*/
          const producto = {
            //"id": Math.floor(Math.random() * 1000),
            "nombre": formulario.querySelector('#nombreProductoActualizar').value,
            "marca": formulario.querySelector('#marcaProductoActualizar').value,
            "precio":formulario.querySelector('#precioProductoActualizar').value,
            "stock":formulario.querySelector('#stockProductoActualizar').value
            //"supermercado":{
               // "id":idSupermercado
            //}
          }
          // Realizar solicitud fetch para actualizar los datos del usuario
          fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}`, {
            method: 'PUT',
            body: JSON.stringify(producto),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(usuarioActualizado => {
              // Actualizar los datos del usuario en la tabla
              const fila = e.target.closest('tr');
              fila.querySelector('td:nth-child(1)').textContent = usuarioActualizado.name;
              fila.querySelector('td:nth-child(2)').textContent = usuarioActualizado.username;
              fila.querySelector('td:nth-child(3)').textContent = usuarioActualizado.address.geo.lat;
              fila.querySelector('td:nth-child(4)').textContent = usuarioActualizado.address.geo.lng;
              // Cerrar la ventana modal
              //modal.style.display = 'none';
            });
        });

      });
      //.catch(error => alert(error.message));
  }
});



function mostrarUsuario(usuario) {
    const fila = document.createElement('tr')
    fila.innerHTML = `
        <td>${usuario.name}</td>
        <td>${usuario.username}</td>
        <td>${usuario.address.geo.lat}</td>
        <td>${usuario.address.geo.lng}</td>
    `
    respuesta.appendChild(fila)
}


//F U N C I O N E S  P A R A  V A L I D A R
function validarTexto(texto) {
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(texto); //Mayusculas, minusculas, acentos, espacios
}
function validarNumeros(cadena) {
  const regex = /^\d{1,6}$/; //Solo números con hasta 6 dígitos
  return regex.test(cadena);
}
