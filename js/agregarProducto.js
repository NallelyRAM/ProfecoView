const url = 'https://jsonplaceholder.typicode.com/users';
const respuesta = document.querySelector("#respuesta")
const btnAgregar = document.querySelector("#botonActualizar")
const tabla = document.querySelector("table tbody");


document.addEventListener("DOMContentLoaded", mostrarUsuarios)

btnAgregar.addEventListener("click", agregarUsuario)

async function mostrarUsuarios() {
    const respuesta = await fetch(url)
    const usuarios = await respuesta.json()
    //mostrarListaUsuarios(usuarios)
   // obtenerUsuarios()
}

async function agregarUsuario() {
    const name = document.querySelector("#nombreProducto").value
    const username = document.querySelector("#marcaProducto").value
    const lat = document.querySelector("#precioProducto").value
    const lng = document.querySelector("#stockProducto").value

    const nuevoUsuario = {
        name: name,
        username: username,
        address: {
            geo: {
                lat: lat,
                lng: lng
            }
        }
    }

    const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(nuevoUsuario),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const usuarioCreado = await respuesta.json()
    mostrarUsuario(usuarioCreado)
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
          <td>${usuario.address.geo.lng}</td>
          <td>${usuario.email}</td>
          <td><button data-id="${usuario.id}" class="detalles">Detalles</button></td>
                      <td><button data-id="${usuario.id}" class="actualizar" data-toggle="modal" data-target="#myModalUpdate">Actualizar</button>
                          <button data-id="${usuario.id}" class="eliminar">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
      });
    });
}
obtenerUsuarios();


//Obtener los detalles del prodcuto
tabla.addEventListener("click", (event) => {
  const botonDetalles = event.target.closest(".detalles");
  if (botonDetalles) {
    const idUsuario = botonDetalles.dataset.id;
    mostrarDetallesUsuario(idUsuario);
  }
});

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
        formulario.querySelector('#nombreProducto').value = usuario.name;
        formulario.querySelector('#marcaProducto').value = usuario.username;
        formulario.querySelector('#precioProducto').value = usuario.address.geo.lat;
        formulario.querySelector('#stockProducto').value = usuario.address.geo.lng;

        // Mostrar la ventana modal
        const modal = document.querySelector('#myModal');
        //modal.style.display = 'modal';

          modal.classList.add("show");
          modal.classList.add("fade");
          document.body.classList.add("modal-open");

        // Agregar evento submit al formulario de la ventana modal
        formulario.addEventListener('submit', e => {
          e.preventDefault();
          // Crear objeto con los nuevos datos del usuario
          const nuevoUsuario = {
            name: formulario.querySelector('#nombreProducto').value,
            username: formulario.querySelector('#marcaProducto').value,
            address: {
              geo: {
                lat: formulario.querySelector('#precioProducto').value,
                lng: formulario.querySelector('#stockProducto').value
              }
            }
          };
          // Realizar solicitud fetch para actualizar los datos del usuario
          fetch(`https://jsonplaceholder.typicode.com/users/${idUsuario}`, {
            method: 'PUT',
            body: JSON.stringify(nuevoUsuario),
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
  }
});


//ABRE OTRA PANTALLA DONDE OBTIENE LA INFORMACIÓN
function mostrarDetallesUsuario(idUsuario) {
  const url = `https://jsonplaceholder.typicode.com/users/${idUsuario}`;
  fetch(url)
    .then((response) => response.json())
    .then((usuario) => {
      const pantallaDetalles = window.open("", "Detalles", "width=400,height=400");
      pantallaDetalles.document.body.innerHTML = `
        <h1>${usuario.name}</h1>
        <p><strong>Username:</strong> ${usuario.username}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Phone:</strong> ${usuario.phone}</p>
        <p><strong>Website:</strong> ${usuario.website}</p>
        <p><strong>Company:</strong> ${usuario.company.name}</p>
        <p><strong>Address:</strong> ${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}, ${usuario.address.zipcode}</p>
      `;
    });
}

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
