//const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
//const tabla = document.querySelector("table tbody");

const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
const tabla = document.getElementById('tabla-comentarios');

if (comentarios.length > 0) {
  tabla.innerHTML = comentarios.map(comentario => `
    <tr>
      <td>${comentario.usuario}</td>
      <td>${comentario.comentario}</td>
      <td>
        <button class="btn btn-primary editar">Editar</button>
        <button class="btn btn-danger eliminar">Eliminar</button>
      </td>
    </tr>
  `).join('');
} else {
  const mensaje = document.createElement('p');
  mensaje.innerText = 'No se encontraron comentarios.';
  tabla.appendChild(mensaje);
}

//boton eliminar
const botonesEliminar = document.querySelectorAll('.eliminar');

botonesEliminar.forEach((boton, index) => {
  boton.addEventListener('click', () => {
    // Obtener el comentario a eliminar
    const comentarioEliminar = comentarios[index];

    // Mostrar un mensaje de confirmación
      if (confirm('¿Está seguro que desea eliminar este comentario?')) {
       // Eliminar el comentario de la lista y actualizar localStorage
       comentarios.splice(index, 1);
       localStorage.setItem('comentarios', JSON.stringify(comentarios));
       location.reload(); // Recargar la página para actualizar la vista
     }

    // Eliminar el comentario de la fila que se selecciono
    comentarios.splice(index, 1);

    // Volver a guardar la  actualizada de la tabla  en localStorage
    localStorage.setItem('comentarios', JSON.stringify(comentarios));

    // Recargar la página
    //location.reload();
  });
});

// boton actualizar
const botonesEditar = document.querySelectorAll('.editar');

// Manejar el evento de clic en los botones de editar
botonesEditar.forEach((boton, index) => {
  boton.addEventListener('click', () => {
    // Obtener el comentario a editar
    const comentarioEditar = comentarios[index];

    // Crear el formulario de edición
    const formHtml = `
      <form>
        <label for="usuario">Supermercado:</label>
        <input type="text" id="usuario" name="usuario" value="${comentarioEditar.usuario}" required>
        <label for="comentario">Comentario:</label>
        <textarea id="comentario" name="comentario" required>${comentarioEditar.comentario}</textarea>
        <button type="submit">Guardar cambios</button>
      </form>
    `;

    // Mostrar la ventana emergente con el formulario de edición
    const ventanaEmergente = window.open('', '_blank', 'width=400,height=300');
    ventanaEmergente.document.write(formHtml);

    // Manejar el envío del formulario
    ventanaEmergente.document.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();

      // Obtener los nuevos datos del formulario
      const nuevoUsuario = ventanaEmergente.document.getElementById('usuario').value;
      const nuevoComentario = ventanaEmergente.document.getElementById('comentario').value;

      // Actualizar el comentario en la matriz de comentarios
      comentarios[index].usuario = nuevoUsuario;
      comentarios[index].comentario = nuevoComentario;

      // Volver a guardar la matriz actualizada en localStorage
      localStorage.setItem('comentarios', JSON.stringify(comentarios));

      // Cerrar la ventana emergente
      ventanaEmergente.close();

      // Recargar la página
      location.reload();
    });
  });
});
