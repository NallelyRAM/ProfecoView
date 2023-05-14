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

// DESCOMENTARIAR - MAPEO Y MÉTODO POST
/*
//de momento, no es la solución correcta
const comentario = datos.element.body

function agregarComentario(){
    const comentariosSupermercado = {

        //"id": Math.floor(Math.random() * 1000),
        //"consumidor":{
            //"id": 
            //idConsumidor
        //},
        "mensaje":comentario
        //"supermercado":{
            //"id": 
            //idSupermercado
        //}
    }

    let idProductoAgregado = 0
    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(comentariosSupermercado)
    })
    .then(response => response.json())
    .then(data => {
        idProductoAgregado = data.id
        console.log(comentariosSupermercado);
    })
    .catch(error => {
        // Manejar errores
        console.error('Error:', error);
        return
    });

}// función agregar comentario
*/ // DESCOMENTARIAR PARA TENER EL MAPEO Y EL POST
