const url = "https://jsonplaceholder.typicode.com/users";
const tabla = document.querySelector("table tbody");

function obtenerUsuarios() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((usuario) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${usuario.name}</td>
          <td>${usuario.username}</td>
          <td>${usuario.email}</td>
          <td>${usuario.phone}</td>
          <td>${usuario.company.name}</td>
          <td><button data-id="${usuario.id}" class="detalles">Detalles</button></td>
        `;
        tabla.appendChild(fila);
      });
    });
}

obtenerUsuarios();
tabla.addEventListener("click", (event) => {
  const botonDetalles = event.target.closest(".detalles");
  if (botonDetalles) {
    const idUsuario = botonDetalles.dataset.id;
    mostrarDetallesUsuario(idUsuario);
  }
});

//ABRE OTRA PANTALLA DO NDE OBTIENE LA INFO
function mostrarDetallesUsuario(idUsuario) {
  const url = `https://jsonplaceholder.typicode.com/users/${idUsuario}`;
  fetch(url)
    .then((response) => response.json())
    .then((usuario) => {
      const pantallaDetalles = window.open("", "Detalles", "width=400,height=400");
      pantallaDetalles.document.body.innerHTML = `
        <h1>${usuario.name}</h1>
        <p><strong>Username:</strong> ${usuario.username}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Phone:</strong> ${usuario.phone}</p>
        <p><strong>Website:</strong> ${usuario.website}</p>
        <p><strong>Company:</strong> ${usuario.company.name}</p>
        <p><strong>Address:</strong> ${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}, ${usuario.address.zipcode}</p>
      `;
    });
}
