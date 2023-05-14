/**const apiUrl = "https://jsonplaceholder.typicode.com/comments";

fetch(apiUrl)
	.then(response => response.json())
	.then(data => {
		const namesDiv = document.getElementById("names");

		data.forEach(comment => {
			const label = document.createElement("label");
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.name = "name";
			checkbox.value = JSON.stringify(comment);
			label.appendChild(checkbox);
			label.appendChild(document.createTextNode(comment.name));
			namesDiv.appendChild(label);
		});
	})
	.catch(error => console.error(error));

function showSelectedNames() {
	const selectedNames = [];
	const checkboxes = document.querySelectorAll('input[name="name"]:checked');

	for (let i = 0; i < checkboxes.length; i++) {
		selectedNames.push(JSON.parse(checkboxes[i].value));
	}

	if (selectedNames.length > 0) {
		localStorage.setItem("selectedNames", JSON.stringify(selectedNames));
		window.location.href = "selected.html";
	} else {
		alert("Por favor, selecciona al menos un nombre.");
	}
}
*/
const apiUrl = "https://jsonplaceholder.typicode.com/comments";

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const commentsTable = document.getElementById("table");

    data.forEach(comment => {
      const row2 = document.createElement("tr");
      const checkboxCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "comment";
      checkbox.value = JSON.stringify(comment);
      checkboxCell.appendChild(checkbox);
      row2.appendChild(checkboxCell);
      row2.appendChild(document.createElement("td")).textContent = comment.name;
      row2.appendChild(document.createElement("td")).textContent = comment.id;
      row2.appendChild(document.createElement("td")).textContent = comment.email;
      commentsTable.appendChild(row);
    });
  })
  .catch(error => console.error(error));
function showSelectedComments() {
  const selectedComments = [];
  const checkboxes = document.querySelectorAll('input[name="comment"]:checked');

  for (let i = 0; i < checkboxes.length; i++) {
    selectedComments.push(JSON.parse(checkboxes[i].value));
  }

  if (selectedComments.length > 0) {
    localStorage.setItem("selectedComments", JSON.stringify(selectedComments));
    window.location.href = "selected.html";
  } else {
    alert("Por favor, selecciona al menos un comentario.");
  }
}
