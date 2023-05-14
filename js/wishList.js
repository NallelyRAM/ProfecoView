

const selectedComments = JSON.parse(localStorage.getItem("selectedComments"));
const selectedCommentsTableBody = document.querySelector("#selected-comments-table tbody");

selectedComments.forEach(comment => {
  const row = document.createElement("tr");
  row.appendChild(document.createElement("td")).textContent = comment.name;
  row.appendChild(document.createElement("td")).textContent = comment.id;
  row.appendChild(document.createElement("td")).textContent = comment.email;

  const btnEdit = document.createElement("button");
  btnEdit.textContent = "Editar";
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Eliminar";
  const tdEdit = document.createElement("td");
  const tdDelete = document.createElement("td");
  tdEdit.appendChild(btnEdit);
  tdDelete.appendChild(btnDelete);
  row.appendChild(tdEdit);
  row.appendChild(tdDelete);

  selectedCommentsTableBody.appendChild(row);
});