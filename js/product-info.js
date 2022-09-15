// async function to get data
async function getData(){
    let link = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('id')}.json`
    let respuesta = await fetch(link);
    if (respuesta.ok){
        let data = await respuesta.json();
        return data;
    }
}

// async function to get comment data
async function getComments(){
    let link = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('id')}.json`
    let respuesta = await fetch(link);
    if (respuesta.ok){
        let comment_data = await respuesta.json();
        return comment_data;
    }
}

// async function to work with data
document.addEventListener('DOMContentLoaded', async function(){
    let data = await getData();
    let comment_data = await getComments();
    add_to_html(data);
    fillImages(data);
    fillReviews(comment_data);
})

// function to add html code
function add_to_html(data){
    const contenedor = document.getElementById('contenedor');
    let content = '';
    content = `
    <div class="text-center p-4">
    <h1 id="name_prod" class="text-start">${data.name}</h1>
    </div>
    <hr>
    <div class="row m-0 px-4">
    <div class="col-md-6">
      <div class="row mb-3">
        <h4>Precio</h4>
        <p>${data.currency} ${data.cost}</p>
      </div>
      <div class="row mb-3">
        <h4>Descripción</h4>
        <p>${data.description}</p>
      </div>
      <div class="row mb-3">
        <h4>Categoría</h4>
        <p>${data.category}</p>
      </div>
      <div class="row mb-3">
        <h4>Cantidad de vendidos</h4>
        <p>${data.soldCount}</p>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Imágenes</h4>
        <div class="row" id="imagenes"></div>
    </div>
    </div>
    <hr>
    <div class="row m-0 px-4">
    <div class="col">
      <h4 class="mb-4">Comentarios</h4>
      <div class="row" id="comentarios"></div>
    </div>
    </div>
    <hr>
    <div class="row m-0 px-4">
    <div class="col">
      <h4 class="mb-4">Agrega tu comentario</h4>
      <div class="row" id="agrega_comentario">
        <p class="mb-1">Tu opinión:</p>
        <textarea id='comentario' class="mb-3 col-md-6 col-lg-4" cols="30" rows="3"></textarea>
        <p class="mb-1">Tu puntuación:</p>
        <select id="puntos" class="col-md-4 col-lg-2">
          <option selected disabled class="text-center">---- elije una puntuación ----</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    </div>
    `
    contenedor.innerHTML = content;
} 

// function to add all images 
function fillImages(data){
    let imagenes = document.getElementById("imagenes");
    let image_content = '';
    (data.images).forEach(element => {
        image_content += `
        <div class="col-sm-12 col-md-6 col-lg-3 p-2" style="min-width: 300px;">
            <img class="img-thumbnail shadow" src="${element}" alt="">
        </div>`
    });
    imagenes.innerHTML = image_content;
}

// function to add reviews
function fillReviews(comment_data){
    let reviews = document.getElementById("comentarios");
    let review_content = '';
    comment_data.forEach(review => {
      
      const star_array = ['','','','',''];
      star_array.forEach((star, idx) => {
        if (review.score > idx){
          star_array[idx] = 'checked';
        }
      });
      
      review_content +=`
        <div class="card mb-2 shadow">
        <div class="row justify-content-between">
          <div class="col-md-6">
            <p><b>${review.user}</b> - ${review.dateTime}</p>
          </div>
          <div class="col-md-4 text-md-end mb-3">
            <div class="star">
                <span class="fa fa-star ${star_array[0]}"></span>
                <span class="fa fa-star ${star_array[1]}"></span>
                <span class="fa fa-star ${star_array[2]}"></span>
                <span class="fa fa-star ${star_array[3]}"></span>
                <span class="fa fa-star ${star_array[4]}"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <p>${review.description}</p>
        </div>
        </div>`
    });
    reviews.innerHTML = review_content;
}

// Adding comments

let content = '';
const boton = document.getElementById('btn');

boton.addEventListener('click', ()=>{
  const user = localStorage.getItem('personal_email');
  const user_comment = document.getElementById('comentario');
  const user_points = document.getElementById('puntos');
  const d = new Date();
  const date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  console.log(d.getDate())

  if (user_points.value != '---- elije una puntuación ----'){
    const star_array = ['','','','',''];
    star_array.forEach((star, idx) => {
      if (user_points.value > idx){
        star_array[idx] = 'checked';
      }
    });
    
    content = `
    <div class="card mb-2 shadow">
    <div class="row justify-content-between">
      <div class="col-md-6">
        <p><b>${user}</b> - ${date}</p>
      </div>
      <div class="col-md-4 text-md-end mb-3">
        <div class="star">
            <span class="fa fa-star ${star_array[0]}"></span>
            <span class="fa fa-star ${star_array[1]}"></span>
            <span class="fa fa-star ${star_array[2]}"></span>
            <span class="fa fa-star ${star_array[3]}"></span>
            <span class="fa fa-star ${star_array[4]}"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <p>${user_comment.value}</p>
    </div>
    </div>`
    
    
    document.getElementById("comentarios").innerHTML += content;
  
    user_comment.value = '';
    user_points.value = '---- elije una puntuación ----';


  }
  else{
    alert('Debe ingresar una puntuación');
  }

})



