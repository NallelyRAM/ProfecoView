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

/**
function mostrarListaUsuarios(usuarios) {
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr')
        fila.innerHTML = `
            <td>${usuario.name}</td>
            <td>${usuario.username}</td>
            <td>${usuario.username}</td>
            <td>${usuario.username}</td>
            <td>${usuario.username}</td>
            <td><button data-id="${usuario.id}" class="detalles">Detalles</button></td>
            <td><button data-id="${usuario.id}" class="detalles">Actualizar</button>
                <button data-id="${usuario.id}" class="detalles">Eliminar</button></td>
        `
        tabla.appendChild(fila);
        //respuesta.appendChild(fila)
    })
}
*/
function obtenerUsuarios() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((usuario) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${usuario.name}</td>
          <td>${usuario.username}</td>
          <td>${usuario.email}</td>
          <td>${usuario.phone}</td>
          <td>${usuario.company.name}</td>
          <td><button data-id="${usuario.id}" class="detalles">Detalles</button></td>
                      <td><button data-id="${usuario.id}" class="actualizar">Actualizar</button>
                          <button data-id="${usuario.id}" class="eliminar">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
      });
    });
}
obtenerUsuarios();
tabla.addEventListener("click", (event) => {
  const botonDetalles = event.target.closest(".detalles");
  if (botonDetalles) {
    const idUsuario = botonDetalles.dataset.id;
    mostrarDetallesUsuario(idUsuario);
  }
});

//ABRE OTRA PANTALLA DO NDE OBTIENE LA IN
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
