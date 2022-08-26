const login = document.getElementById('login_btn');
const inputs = document.querySelectorAll('form input');
var valid = true;
var personal_email;

login.addEventListener('click', (event)=>{
    event.preventDefault();
    valid = true;
    cleanErrors(inputs);
    verifyEmpty(inputs);
    signIn(valid);
})

function verifyEmpty(array){
    array.forEach(element => {
        if (element.value == '' || element.value == null){
            let errormsg = document.querySelector(`#${element.id}+p`);
            errormsg.innerHTML = `Por favor, ingrese su ${element.name}`;
            valid = false;
        }
    });
}

function signIn(valid){
    if (valid){
        setEmail();
        localStorage.setItem('personal_email', personal_email)
        window.location.href = './home.html';
    }
}

function cleanErrors(array){
    array.forEach(element => {
        let errormsg = document.querySelector(`#${element.id}+p`);
        errormsg.innerHTML = '';
    });
}

function setEmail(){
    personal_email = document.getElementById('email').value;
}