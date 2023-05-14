fetch('https://jsonplaceholder.typicode.com/comments')
	.then(response => response.json())
	.then(comments => {
		// obtener los nombres de usuario únicos
		const users = [...new Set(comments.map(comment => comment.name))];

		// rellenar el combo con los nombres de usuario
		const userSelect = document.getElementById('user-select');
		users.forEach(user => {
			const option = document.createElement('option');
			option.value = user;
			option.textContent = user;
			userSelect.appendChild(option);
		});

	// manejar el envío del formulario
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', event => {
      event.preventDefault();

      // obtener los datos del formulario
      const user = userSelect.value;
      const comment = document.getElementById('comment-input').value;

      // validar que el comentario no esté vacío y no haya seleccionado un super
      if (user.trim() === '') {
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
      const userCell = row.insertCell();
      const commentCell = row.insertCell();
      userCell.textContent = user;
      commentCell.textContent = comment;

      // agregar la selección del usuario como un campo oculto
      const selectionInput = document.createElement('input');
      selectionInput.type = 'hidden';
      selectionInput.name = 'selection';
      selectionInput.value = user;
      commentForm.appendChild(selectionInput);

      // guardar el comentario en el localStorage
      const comentario = { usuario: user, comentario: comment };
      comentarios.push(comentario);
      localStorage.setItem('comentarios', JSON.stringify(comentarios));

      // limpiar el formulario
      userSelect.selectedIndex = 0;
      document.getElementById('comment-input').value = '';
    });

	});
// obtener los comentarios guardados en el localStorage
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

// agregar los comentarios a la tabla
const commentTable = document.getElementById('comment-table');
comentarios.forEach(comentario => {
  const row = commentTable.insertRow();
  const userCell = row.insertCell();
  const commentCell = row.insertCell();
  userCell.textContent = comentario.usuario;
  commentCell.textContent = comentario.comentario;
});
// guardar el comentario en el localStorage
const comentario = { usuario: user, comentario: comment };
comentarios.push(comentario);
localStorage.setItem('comentarios', JSON.stringify(comentarios));
