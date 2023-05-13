const url = 'https://jsonplaceholder.typicode.com/comments';
const respuesta = document.querySelector("#respuesta")

//Evento
document.addEventListener("DOMContentLoaded", llamrAPI)

async function llamrAPI(){
    const respuesta = await fetch(url)
    const datos = await respuesta.json()
    mostrarCuerpo(datos)
}

function mostrarCuerpo(datos){
    datos.forEach(element => {
        const fila = document.createElement('tr')
        fila.innerHTML= `
        <td>${element.name}</td>
        <td>${element.body}</td>
        `
        respuesta.appendChild(fila)
    });
}
