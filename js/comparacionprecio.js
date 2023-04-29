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
        <td>${element.address.zipcode}</td>
        `
        respuesta.appendChild(fila)
        ordenarprecio( `${element.address.zipcode}</td>`)

    });

}

async function ordenarprecio(numero){
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


}

fetch(url)
  .then(response => response.json())
  .then(data => {

    // Agregamos la tabla al documento HTML
    document.body.appendChild(tabla);

    // Obtenemos las filas de la tabla
    var filas = tabla.rows;

    // Creamos un array vacío para almacenar los valores de la columna
    var valores = [];

    // Recorremos las filas de la tabla, comenzando desde la segunda fila (índice 1)
    for (var i = 1; i < filas.length; i++) {
      // Obtenemos la celda correspondiente a la segunda columna
      var celda = filas[i].cells[1];

      // Obtenemos el valor de la celda y lo convertimos a un número
      var valor = parseFloat(celda.innerHTML);

      // Agregamos el valor al array de valores
      valores.push(valor);
    }

    // Ordenamos el array de valores en orden ascendente
    valores.sort(function(a, b) {
      return a - b;
    });

    // Imprimimos los valores ordenados en la consola
    console.log(valores); // Devuelve los valores ordenados
  })
  .catch(error => console.error(error));