const URL_API = 'https://jsonplaceholder.typicode.com/comments';
const buscador = document.getElementById('buscador');
const tablaSupermercado = document.getElementById('tabla-prductos');



//BUSCAA
const buscar = () => {
  const textoBusqueda = buscador.value.toLowerCase();

  // Realizar la solicitud a la API
  fetch(URL_API)
    .then(response => response.json())
    .then(comentarios => {
      // Filtrar los comentarios por nombre, precio o super
      const comentariosFiltrados = comentarios.filter(comentario => {
        const nombre = comentario.name.toLowerCase();
                const id = comentario.id.toString().toLowerCase();
                const email = comentario.email.toLowerCase();
                return nombre.includes(textoBusqueda) || id.includes(textoBusqueda) || email.includes(textoBusqueda);
      });

      // Mostrar los comentarios en la tabla
      mostrarComentarios(comentariosFiltrados);
    })
    .catch(error => console.error(error));
};

// Función que muestra los comentarios en la tabla
const mostrarComentarios = comentarios => {
  // Limpiar la tabla antes de agregar nuevos comentarios
  tablaSupermercado.innerHTML = '';

  // Recorrer los comentarios y agregarlos a la tabla
  comentarios.forEach(comentario => {
    const row = document.createElement('tr');
    const checkboxCell = document.createElement("td");
    const checkbox = document.createElement("input");
    const nombre = document.createElement('td');


    checkbox.type = "checkbox";
    checkbox.name = "comment";
    checkbox.value = JSON.stringify(comentario);
    checkboxCell.appendChild(checkbox);

    nombre.textContent = comentario.name;

    row.appendChild(checkboxCell);
    row.appendChild(nombre);


    tablaSupermercado.appendChild(row);
  });
};

// Escuchar el evento de cambio en el cuadro de búsqueda
buscador.addEventListener('input', buscar);

// Mostrar todos los comentarios al cargar la página
buscar();


///buscar por RADIO
function mostrarProductos() {
  const ordenRadios = document.getElementsByName("orden");
  let orden = "asc"; // orden por defecto
  for (let i = 0; i < ordenRadios.length; i++) {
    if (ordenRadios[i].checked) {
      orden = ordenRadios[i].value === "ascendente" ? "asc" : "desc";
    }
  }
  fetch(`https://jsonplaceholder.typicode.com/comments?_sort=id&_order=${orden}`)
    .then(response => response.json())
    .then(data => {
      const tabla = document.getElementById("tabla-Comentarios");
      tabla.innerHTML = ""; // Limpiar la tabla
      // Agregar las filas de la tabla
      mostrarComentarios(data);

    });
}

//SELECCIÓN DE PRODUCTO Y AGREGARLO EN LA WISH
//SELECCIÓN DE PRODUCTO Y AGREGARLO EN LA WISH

// obtener comentarios previamente seleccionados (cuando esta vacia))
let selectedComments = JSON.parse(localStorage.getItem("selectedComments")) || [];

// rellenar la tabla con comentarios
fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .then(data => {
    const commentsTable = document.getElementById("tabla-Comentarios");

    data.forEach(comment => {
      const row = document.createElement("tr");
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "comment";
      checkbox.value = JSON.stringify(comment);
      // marque la casilla si este comentario fue seleccionado previamente
      if (selectedComments.find(selectedComment => selectedComment.id === comment.id)) {
        checkbox.checked = true;
      }
      checkboxCell.appendChild(checkbox);
      row.appendChild(checkboxCell);
      row.appendChild(document.createElement("td")).textContent = comment.name;

      commentsTable.appendChild(row);
    });
  })
  .catch(error => console.error(error));

function showSelectedComments() {
  const checkboxes = document.querySelectorAll('input[name="comment"]:checked');

  // añadir los nuevos comentarios seleccionados a los existentes en localStorage
  checkboxes.forEach(checkbox => {
    const comment = JSON.parse(checkbox.value);
    if (!selectedComments.find(selectedComment => selectedComment.id === comment.id)) {
      selectedComments.push(comment);
    }
  });

  // guardar los comentarios seleccionados actualizados
  localStorage.setItem("selectedComments", JSON.stringify(selectedComments));


  if (selectedComments.length > 0) {
    window.location.href = "listaSuperFav.html";
  } else {
    alert("Por favor, selecciona al menos un producto.");
  }
}

const url = URL_API;
const consumidor = {
   //"id_consumidores": Math.floor(Math.random() * 1000),
    "nombre": nombre,
    "contraseña": marca,
    "email":precio,
    "edad":stock,
    //"id": consumidorId,
    //"wishList":{
        // "id":consumidorId
    //}
    //"supermercadosFavoritosList":{
        // "id":consumidorId
    //}
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(consumidor)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  
  
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(consumidor)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

