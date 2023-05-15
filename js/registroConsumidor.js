const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // evitar que el formulario se envíe automáticamente

  // Obtener los datos del formulario
  const name = document.getElementById('name-input').value;
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  const confirmPassword = document.getElementById('confirm-password-input').value;

  // Validar que los campos no estén vacíos y que las contraseñas coincidan
  if (!name || !email || !password || !confirmPassword) {
    alert('Por favor complete todos los campos');
    return;
  }
  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }



  // Redirigir al usuario a otra página
  window.location.href = 'agregarSuperList.html';
});
