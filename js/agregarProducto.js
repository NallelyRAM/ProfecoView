const url = 'https://jsonplaceholder.typicode.com/users';
const respuesta = document.querySelector("#respuesta")
const btnAgregar = document.querySelector("#botonActualizar")

document.addEventListener("DOMContentLoaded", mostrarUsuarios)

btnAgregar.addEventListener("click", agregarUsuario)

async function mostrarUsuarios() {
    const respuesta = await fetch(url)
    const usuarios = await respuesta.json()
    mostrarListaUsuarios(usuarios)
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
        respuesta.appendChild(fila)
    })
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
