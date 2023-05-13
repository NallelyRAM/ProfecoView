//console.log("entro")
//AQUI
const url='https://jsonplaceholder.typicode.com/users';
const respuesta= document.querySelector("#respuesta")

//Evento
document.addEventListener("DOMContentLoaded", llamrAPI)

/** FORMA 1
function llamrAPI(){
    //console.log("Entroo2")
    fetch(url)
    .then(resp => resp.json())
    .then((dato) => mostarListaSuper(dato))
}
*/
/**FORMA 2 */
async function llamrAPI(){
    const respuesta = await fetch(url)
    const dato = await respuesta.json()
    mostarListaSuper(dato)
}

/*function mostarListaSuper(datos){
    datos.forEach(item =>{
        console.log(item)
    });
}*/
function mostarListaSuper(datos){
    datos.forEach(element => {
        //console.log(element)
        const fila = document.createElement('tr')
        fila.innerHTML= `
        <td>${element.name}</td>
        <td>${element.address.street}</td>
        <td>${element.email}</td>
        <td><button data-id="${usuario.id}" class="detalles">Detalles</button></td>
        `
        respuesta.appendChild(fila)

    });
}
