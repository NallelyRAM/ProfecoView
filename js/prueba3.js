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
      const commentTable = document.getElementById('comment-table');
      const row = commentTable.insertRow();
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
      comentarios.push(comentario);
      localStorage.setItem('comentarios', JSON.stringify(comentarios));

      // limpiar el formulario
      superSelect.selectedIndex = 0;
      document.getElementById('comment-input').value = '';
    });

	});
// obtener los comentarios guardados en el localStorage
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

// agregar los comentarios a la tabla
const commentTable = document.getElementById('comment-table');
comentarios.forEach(comentario => {
  const row = commentTable.insertRow();
  const superWor = row.insertCell();
  const commentCell = row.insertCell();
  superWor.textContent = comentario.usuario;
  commentCell.textContent = comentario.comentario;
});
// guardar el comentario en el localStorage
const comentario = { usuario: user, comentario: comment };
comentarios.push(comentario);
localStorage.setItem('comentarios', JSON.stringify(comentarios));