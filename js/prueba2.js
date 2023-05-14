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
    const nombre = document.createElement('td');
    const id = document.createElement('td');
    const email = document.createElement('td');

    nombre.textContent = comentario.name;
    id.textContent = comentario.id;
    email.textContent = comentario.email;

    row.appendChild(nombre);
    row.appendChild(id);
    row.appendChild(email);

    tablaSupermercado.appendChild(row);
  });
};

// Escuchar el evento de cambio en el cuadro de búsqueda
buscador.addEventListener('input', buscar);

// Mostrar todos los comentarios al cargar la página
buscar();

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

fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .then(data => {
    const commentsTable = document.getElementById("tabla-Comentarios");

    // Agregar cabecera de selección
    const headerRow = commentsTable.insertRow(0);
    const headerCell = document.createElement("th");
    const selectAllCheckbox = document.createElement("input");
    selectAllCheckbox.type = "checkbox";
    selectAllCheckbox.name = "selectAll";
    selectAllCheckbox.addEventListener("change", function () {
      const checkboxes = document.getElementsByName("comment");
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = this.checked;
      }
    });


    data.forEach(comment => {
      const row = document.createElement("tr");
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "comment";
      checkbox.value = JSON.stringify(comment);
      checkboxCell.appendChild(checkbox);
      row.appendChild(checkboxCell);
      row.appendChild(document.createElement("td")).textContent = comment.name;
      row.appendChild(document.createElement("td")).textContent = comment.id;
      row.appendChild(document.createElement("td")).textContent = comment.email;
      commentsTable.appendChild(row);
    });
  })
  .catch(error => console.error(error));


function showSelectedComments() {
  const selectedComments = [];
  const checkboxes = document.querySelectorAll('input[name="comment"]:checked');

  for (let i = 0; i < checkboxes.length; i++) {
    selectedComments.push(JSON.parse(checkboxes[i].value));
  }

  if (selectedComments.length > 0) {
    localStorage.setItem("selectedComments", JSON.stringify(selectedComments));
    window.location.href = "wishList.html";
  } else {
    alert("Por favor, selecciona al menos un producto.");
  }
}

