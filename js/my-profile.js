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
