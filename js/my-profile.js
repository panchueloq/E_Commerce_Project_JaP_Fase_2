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
            guardarCambios()
          }

        form.classList.add('was-validated')
        }, false)
    })
})()

// Previewing Loaded Image
const image_input = document.querySelector("#image_input");
const display_image = document.querySelector('#display_image');

var uploaded_image = '';

image_input.addEventListener('change', ()=>{
    const reader = new FileReader();
    reader.addEventListener('load', ()=>{
        uploaded_image = reader.result;
        display_image.style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(image_input.files[0]);
    display_image.classList.remove('d-none');
})

// CHECK IF LOGGED IN
if (!personal_email){
    let notLoggedModal = new bootstrap.Modal(document.getElementById('notLoggedModal'), {keyboard: false});
    notLoggedModal.show();
}

const not_logged_btn = document.getElementById('not_logged_btn');
not_logged_btn.addEventListener('click', ()=>{
    window.location = 'index.html';
})

// Profiles setup
let profiles = [];
if(!localStorage.getItem('profiles')){
    localStorage.setItem('profiles', JSON.stringify(profiles));
}
profiles = JSON.parse(localStorage.getItem('profiles'));

// Variables
var f_name = document.getElementById('f_name');
var s_name = document.getElementById('s_name');
var l_name = document.getElementById('l_name');
var sl_name = document.getElementById('sl_name');
var phone = document.getElementById('phone');
var pict = document.getElementById('pict');
var email_input = document.getElementById('email');
var current_email = localStorage.getItem('personal_email');

// SHOW CURRENT INFO
var profile = profiles.filter(item => item.email === current_email)
if(profile[0] === undefined){
    let new_profile = {
        email: current_email,
        f_name: '',
        s_name: '',
        l_name: '',
        sl_name: '',
        phone: '',
        uploaded_image: ''
    }
    profiles.push(new_profile);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    window.location = 'my-profile.html';
}

email_input.value = profile[0].email;
f_name.value = profile[0].f_name;
s_name.value = profile[0].s_name;
l_name.value = profile[0].l_name;
sl_name.value = profile[0].sl_name;
phone.value = profile[0].phone;

if(profile[0].uploaded_image){
    pict.src = profile[0].uploaded_image;
} 

// Function to save changes
function guardarCambios(){
    profiles = profiles.map(object=>{
        if(object.email === current_email){
            object.f_name = f_name.value;
            object.s_name = s_name.value;
            object.l_name = l_name.value;
            object.sl_name = sl_name.value;
            object.phone = phone.value;
            if(!document.getElementById('image_input').value == ''){
                profile[0].uploaded_image = uploaded_image;
            }
        }
        return object;
    })
    localStorage.setItem('profiles', JSON.stringify(profiles));

    window.location = 'my-profile.html';
}