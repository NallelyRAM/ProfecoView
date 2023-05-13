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
      for (let i = 0; i < data.length; i++) {
        const comentario = data[i];
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${comentario.name}</td>
          <td>${comentario.id}</td>
          <td>${comentario.email}</td>
        `;
        tabla.appendChild(fila);
      }
    });
}
function limpiarSeleccion() {
  const ordenRadios = document.getElementsByName("orden");
  for (let i = 0; i < ordenRadios.length; i++) {
    ordenRadios[i].checked = false;
  }
}