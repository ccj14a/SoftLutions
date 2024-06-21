document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function () {
        window.location.href = 'Login.html'; // Redirige a la página de inicio de sesión
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('registrarButton');

    logoutButton.addEventListener('click', function () {
        window.location.href = 'CrearCuenta.html'; // Redirige a la página de inicio
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function () {
        window.location.href = 'Inicio.html'; // Redirige a la página de inicio
    });
});
