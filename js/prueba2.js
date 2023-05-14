// Obtener los datos de localStorage si existen
const usuario = localStorage.getItem('usuario');


//const comentario = localStorage.getItem('comentario');
//hace que se pueda guardar todos los comentarios que se han echo
const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];


if (comentarios.length > 0) {
 const tabla = document.createElement('table');
 const encabezado = tabla.createTHead().insertRow();
 //Se crea tabla
 encabezado.insertCell().innerText = 'Supermercado';
 encabezado.insertCell().innerText = 'Comentario';
 encabezado.insertCell().innerText = 'Acciones';

 const cuerpo = tabla.createTBody();
 comentarios.forEach((comentario, index) => {
   // Crear fila para cada comentario
   const fila = cuerpo.insertRow();

   // Insertar datos del comentario en la fila
   fila.insertCell().innerText = comentario.usuario;
   fila.insertCell().innerText = comentario.comentario;

   // Crear botón de editar
   const botonEditar = document.createElement('button');
   botonEditar.innerText = 'Editar';
   botonEditar.addEventListener('click', () => {
     // Obtener el comentario a editar
     const comentarioEditar = comentarios[index];


   });

   // Crear botón de eliminar
   const botonEliminar = document.createElement('button');
   botonEliminar.innerText = 'Eliminar';
   botonEliminar.addEventListener('click', () => {
     // Preguntar al usuario si realmente desea eliminar el comentario
     if (confirm('¿Está seguro que desea eliminar este comentario?')) {
       // Eliminar el comentario de la lista y actualizar localStorage
       comentarios.splice(index, 1);
       localStorage.setItem('comentarios', JSON.stringify(comentarios));
       location.reload(); // Recargar la página para actualizar la vista
     }
   });


   // Insertar botones de editar y eliminar en la fila
   const celdaAcciones = fila.insertCell();
   celdaAcciones.appendChild(botonEditar);
   celdaAcciones.appendChild(botonEliminar);
 });

 // Agregar la tabla a la página
 document.body.appendChild(tabla);
} else {
  // Si no hay comentarios, mostrar un mensaje al usuario
  const mensaje = document.createElement('p');
  mensaje.innerText = 'No se encontraron comentarios.';
  document.body.appendChild(mensaje);
}
