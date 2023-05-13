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
    const datos = await respuesta.json()
    ordenarprecio(datos)
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
        <td>${element.address.geo.lng}</td>
        `
        respuesta.appendChild(fila)
        ordenarprecio(`<td>${element.address.geo.lng}</td>`)

    });

}

async function ordenarprecio(datos){
    /**var numero= `<td>${element.address.zipcode}</td>
                        `
    numero.sort(function(a , b){
        return a - b
    });

    console.log(numero);*/
/** ESTE ES EL MEROOOOOO
    var tabla = document.getElementById("tabla");
    var filas = tabla.rows;
    var valores = [];

    for (var i = 1; i < filas.length; i++) {
      var celda = filas[i].cells[1];
      var valor = parseFloat(celda.innerHTML);
       valores.push(valor);
    }

    valores.sort(function(a, b) {
      return a - b;
    });


    console.log(valores);
    console.log("ENTROOOO")*/
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      // Ordenar usuarios por lng de mayor a menor
      data.sort((a, b) => a.address.geo.lng - b.address.geo.lng);
      // Mostrar usuarios ordenados
      console.log('Usuarios ordenados por lng de mayor a menor:');
      data.forEach(user => {
        console.log(`Nombre: ${user.name} | lng: ${user.address.geo.lng}`);

        const fila = document.createElement('tr')
        fila.innerHTML= `
        <td>${user.name}</td>
        <td>${user.address.geo.lng}</td>
        `
        respuesta.appendChild(fila)
        ordenarprecio(`<td>${user.address.geo.lng}</td>`)
      });
    });
}

