const form = document.getElementById('myFormrg');

form.addEventListener('submit', (event) => {
  // Evita que el formulario se envíe automáticamente
event.preventDefault();

  // Obtener los valores de los campos
const nombre = document.getElementById('nombre').value;
const apellido = document.getElementById('apellido').value;
const email = document.getElementById('email').value;
const pwd = document.getElementById('pwd').value;
const cpwd = document.getElementById('cpwd').value;

  // Verificar que todos los campos tengan un valor
if (!nombre || !apellido || !email || !pwd || !cpwd) {
    alert('Por favor complete todos los campos.');
    return;
}

  // Verificar que la dirección de correo electrónico sea válida
const emailRegex = /^\S+@\S+\.\S+$/;
if (!emailRegex.test(email)) {
    alert('Por favor ingrese una dirección de correo electrónico válida.');
    return;
}

  // Verificar que la contraseña y la confirmación sean iguales
if (pwd !== cpwd) {
    alert('La contraseña y la confirmación no coinciden.');
    return;
}

  // Guardar los datos del usuario en el localStorage
const usuario = {
    nombre,
    apellido,
    email,
    pwd
};

localStorage.setItem('usuario', JSON.stringify(usuario));
const usuarioActivo = JSON.parse(localStorage.getItem('usuario'));
const nombreUsuario = usuarioActivo.nombre;
//const bienvenida = document.getElementById('bienvenida');
if(nombreUsuario){
    alert("Bienvenido "+nombreUsuario);
}
window.location.href = '../html/agregarOfertaSupermercado.html';
//bienvenida.innerHTML = `¡Bienvenido/a, ${nombreUsuario}!`;
//    console.log(bienvenida)
});
