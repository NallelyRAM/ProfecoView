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

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));