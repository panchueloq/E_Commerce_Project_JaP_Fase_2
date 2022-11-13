// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
    
// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.prototype.slice.call(forms)
    .forEach(function (form) {
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        }
        else{
            event.preventDefault()
            event.stopPropagation()
            completeLogin()
            }

        form.classList.add('was-validated')
        }, false)
    })
})()

function completeLogin(){
    let personal_email = document.getElementById('email').value;
    localStorage.setItem('personal_email', personal_email);
    window.location.href = './home.html';
}