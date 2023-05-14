/**const selectedNamesTable = document.getElementById("selectedNamesTable");
const selectedNames = JSON.parse(localStorage.getItem("selectedNames"));

selectedNames.forEach(name => {
	const row = selectedNamesTable.insertRow(-1);
	const nameCell = row.insertCell(0);
	const emailCell = row.insertCell(1);
	const commentCell = row.insertCell(2);

	nameCell.innerHTML = name.name;
	commentCell.innerHTML = name.id;
	emailCell.innerHTML = name.email;



});
*/
const selectedComments = JSON.parse(localStorage.getItem("selectedComments"));
const selectedCommentsTableBody = document.querySelector("#selected-comments-table tbody");

selectedComments.forEach(comment => {
  const row = document.createElement("tr");
  row.appendChild(document.createElement("td")).textContent = comment.name;
  row.appendChild(document.createElement("td")).textContent = comment.id;
  row.appendChild(document.createElement("td")).textContent = comment.email;
  selectedCommentsTableBody.appendChild(row);
});
