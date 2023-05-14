

const selectedComments = JSON.parse(localStorage.getItem("selectedComments"));
const selectedCommentsTableBody = document.querySelector("#selected-comments-table tbody");

selectedComments.forEach(comment => {
  const row = document.createElement("tr");
  row.appendChild(document.createElement("td")).textContent = comment.name;
  row.appendChild(document.createElement("td")).textContent = comment.id;
  row.appendChild(document.createElement("td")).textContent = comment.email;
  selectedCommentsTableBody.appendChild(row);
});
