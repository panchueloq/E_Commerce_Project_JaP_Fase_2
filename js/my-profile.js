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




let email = localStorage.getItem('personal_email');

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
else{
    profiles = JSON.parse(localStorage.getItem('profiles'));
}


var f_name = document.getElementById('f_name');
var s_name = document.getElementById('s_name');
var l_name = document.getElementById('l_name');
var sl_name = document.getElementById('sl_name');
var phone = document.getElementById('phone');
var pict = document.getElementById('pict');

var email_input = document.getElementById('email');

// SHOW CURRENT INFO
profiles = JSON.parse(localStorage.getItem('profiles'));
var current_email = localStorage.getItem('personal_email');
var profile = profiles.filter(item => item.email === current_email)

email_input.value = profile[0].email;
f_name.value = profile[0].f_name;
s_name.value = profile[0].s_name;
l_name.value = profile[0].l_name;
sl_name.value = profile[0].sl_name;
phone.value = profile[0].phone;

if(!profile[0].uploaded_image === ''){
    pict.src = profile[0].uploaded_image;
}


// Function to save changes
function guardarCambios(){
    profiles = profiles.map(object=>{
        if(object.email === current_email){
            object[0].f_name = f_name.value;
            object[0].s_name = s_name.value;
            object[0].l_name = l_name.value;
            object[0].sl_name = sl_name.value;
            object[0].phone = phone.value;

            if(!uploaded_image === ''){
                profile[0].uploaded_image = uploaded_image;
            }
        }
        return object;
    })
    localStorage.setItem('profiles', JSON.stringify('profiles'));
    

    window.location = 'my-profile.html';
}



// TEST PROFILES
if(localStorage.getItem('profiles') === '[]'){
    let test_profile = {
        email: 'juan@mail.com',
        f_name: 'Juan ',
        s_name: 'Francisco',
        l_name: 'Quagliotti',
        sl_name: 'Alori',
        phone: '123456',
        uploaded_image: ''
    }
    let test_profile_2 = {
        email: 'pepe@mail.com',
        f_name: '',
        s_name: '',
        l_name: '',
        sl_name: '',
        phone: '',
        uploaded_image: ''
    }

    profiles.push(test_profile);
    profiles.push(test_profile_2);

    localStorage.setItem('profiles', JSON.stringify(profiles));    
}