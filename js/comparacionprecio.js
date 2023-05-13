const table = document.getElementById('users-table');

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    data.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.website}</td>
        <td>
          <button class="update-button" data-id="${user.id}">Update</button>
        </td>
      `;
      table.querySelector('tbody').appendChild(row);
    });
  });
table.addEventListener('click', event => {
  const button = event.target.closest('.update-button');
  if (button) {
    const userId = button.dataset.id;
    const url = `update.html?id=${userId}`;
    window.open(url, '_blank');
  }
});
