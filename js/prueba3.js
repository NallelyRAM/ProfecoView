// obtener los comentarios guardados en el localStorage
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

// agregar los comentarios a la tabla
const commentTable = document.getElementById('comment-table');

// Agregar una fila para los nombres de las columnas
const headerRow = commentTable.insertRow(0);
const superHeader = headerRow.insertCell();
const commentHeader = headerRow.insertCell();
superHeader.textContent = "Supermercado";
commentHeader.textContent = "Comentario";

// Agregar las filas con los comentarios
comentarios.forEach(comentario => {
  const row = commentTable.insertRow(1); // insertar después de la fila de los nombres de las columnas
  const superWor = row.insertCell();
  const commentCell = row.insertCell();
  superWor.textContent = comentario.usuario;
  commentCell.textContent = comentario.comentario;
});

fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .then(comments => {
    // obtener los supermercados
    const superMercado = [...new Set(comments.map(comment => comment.name))];

    // rellenar el combo con los super
    const superSelect = document.getElementById('super-select');
    superMercado.forEach(superMercado => {
      const option = document.createElement('option');
      option.value = superMercado;
      option.textContent = superMercado;
      superSelect.appendChild(option);
    });
superSelect.addEventListener('change', event => {
  const selectedSuper = event.target.value;
  const filteredComments = comentarios.filter(comentario => comentario.usuario === selectedSuper);
  commentTable.innerHTML = ''; // Limpiar la tabla antes de agregar los comentarios filtrados
  // Agregar una fila para los nombres de las columnas
  const headerRow = commentTable.insertRow(0);
  const superHeader = headerRow.insertCell();
  const commentHeader = headerRow.insertCell();
  superHeader.textContent = "Supermercado";
  commentHeader.textContent = "Comentario";
  // Agregar las filas con los comentarios filtrados
  filteredComments.forEach(comentario => {
    const row = commentTable.insertRow(1); // insertar después de la fila de los nombres de las columnas
    const superWor = row.insertCell();
    const commentCell = row.insertCell();
    superWor.textContent = comentario.usuario;
    commentCell.textContent = comentario.comentario;
  });
});


    // manejar el envío del formulario
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', event => {
      event.preventDefault();

      // obtener los datos del formulario
      const supermercadoo = superSelect.value;
      const comment = document.getElementById('comment-input').value;

      // validar que el comentario no esté vacío y no haya seleccionado un super
      if (supermercadoo.trim() === '') {
        alert('Por favor seleccione un supermercado.');
        return;
      }
      if (comment.trim() === '') {
        alert('Por favor ingrese un comentario.');
        return;
      }

      // agregar los datos a la tabla
      const row = commentTable.insertRow(1); // insertar después de la fila de los nombres de las columnas
      const superRow = row.insertCell();
      const commentCell = row.insertCell();
      superRow.textContent = supermercadoo;
      commentCell.textContent = comment;

      // agregar la selección del usuario como un campo oculto
      const selectionInput = document.createElement('input');
      selectionInput.type = 'hidden';
      selectionInput.name = 'selection';
      selectionInput.value = supermercadoo;
      commentForm.appendChild(selectionInput);

      // guardar el comentario en el localStorage
      const comentario = { usuario: supermercadoo, comentario: comment };
      comentarios.unshift(comentario); // agregar al principio del array
      localStorage.setItem('comentarios', JSON.stringify(comentarios));

      // limpiar el formulario
      superSelect.selectedIndex = 0;
      document.getElementById('comment-input').value = '';
    });
  });

