const URL_API = 'https://jsonplaceholder.typicode.com/comments';

// Obtener los elementos HTML necesarios
const buscador = document.getElementById('buscador');
const tablaSupermercado = document.getElementById('tabla-prductos');

// Función que realiza la búsqueda por nombre, ID o email
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