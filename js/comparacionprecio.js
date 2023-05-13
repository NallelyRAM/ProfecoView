// Función que muestra los comentarios en la tabla
const mostrarComentarios = comentarios => {
  // Limpiar la tabla antes de agregar nuevos comentarios
  tablaComentarios.innerHTML = '';

  // Recorrer los comentarios y agregarlos a la tabla
  comentarios.forEach(comentario => {
    const row = document.createElement('tr');
    const nombre = document.createElement('td');
    const id = document.createElement('td');
    const email = document.createElement('td');
    const enlace = document.createElement('td');
    const link = document.createElement('a');

    nombre.textContent = comentario.name;
    id.textContent = comentario.id;
    email.textContent = comentario.email;
    link.textContent = 'Ver detalles';
    link.href = `detalle.html?name=${comentario.name}`;

    enlace.appendChild(link);

    row.appendChild(nombre);
    row.appendChild(id);
    row.appendChild(email);
    row.appendChild(enlace);

    tablaComentarios.appendChild(row);
  });
};
