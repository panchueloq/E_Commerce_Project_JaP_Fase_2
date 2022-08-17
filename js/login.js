const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login_btn');
const google = document.getElementById('google_btn');

login.addEventListener('click', ()=>{
    event.preventDefault();
    if (email.value == '' || password.value == ''){
        alert('Por favor, completar los campos de ingreso');
    }
    else {
        window.location.href = './home.html';
    }
})

