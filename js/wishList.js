const url = 'https://jsonplaceholder.typicode.com/users';
const selectedComments = JSON.parse(localStorage.getItem("selectedComments"));
const selectedCommentsTableBody = document.querySelector("#selected-comments-table tbody");

selectedComments.forEach(comment => {
  const row = document.createElement("tr");
  row.appendChild(document.createElement("td")).textContent = comment.name;
  row.appendChild(document.createElement("td")).textContent = comment.id;
  row.appendChild(document.createElement("td")).textContent = comment.email;

/*
  //Mapping
  const wishList = {
    //"id:" Math.floor(Math.random() * 1000),
    "deseo": deseo
    //"supermercado":{
    //"id": 
        //idSupermercado
      //},
    //"consumidor":{
      //"id": 
        //idConsumidor
      //}
  }

    let idProductoAgregado = 0
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wishList)
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
      });
*/

//Boton eliminar
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Eliminar";
  btnDelete.classList.add("btn");
  btnDelete.classList.add("btn-danger")
  const tdDelete = document.createElement("td");
  tdDelete.appendChild(btnDelete);
  row.appendChild(tdDelete);
  selectedCommentsTableBody.appendChild(row);


//Accion para que elimine un producto de la wish
  btnDelete.addEventListener("click", () => {
    if (confirm("¿Está seguro que desea eliminar este comentario?")) {
      // Eliminar fila de la tabla
      row.remove();
      // Eliminar comentario del almacenamiento local
      const index = selectedComments.indexOf(comment);
      selectedComments.splice(index, 1);
      localStorage.setItem("selectedComments", JSON.stringify(selectedComments));
    }
  });

});