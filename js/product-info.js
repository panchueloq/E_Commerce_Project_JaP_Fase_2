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
    make_button_work();
    fillRelated(data);
    get_object(data);
    setInterval(function(){
      document.getElementById('click_next').click();
    }, 3000);
})

// function to add html code
function add_to_html(data){
    const contenedor = document.getElementById('contenedor');
    let content = '';
    content = `
    <div class="row text-center p-4">
      <h1 id="name_prod" class="col-12 col-md-8 text-start">${data.name}</h1>
      <div class="col-12 col-md-4 d-flex align-items-center justify-content-end">
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-success" onclick="add_to_cart()">
          <i class="bi bi-cart-fill"></i> Agregar al Carrito
        </button>
      </div>
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
        
      <div class="col">
        <div id="carruselito" class="carousel slide carousel-dark shadow" data-bs-ride="carousel">
          <div class="carousel-indicators" id="button_part">
            <button type="button" data-bs-target="#carruselito" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          </div>
          <div class="carousel-inner" id="imagenes">
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carruselito" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button id="click_next" class="carousel-control-next" type="button" data-bs-target="#carruselito" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

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
        <select id="puntos" class="col-md-4 col-lg-3">
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
    <div class="row-cols-10 m-0 px-4 mb-3">
      <div id='btn' class="btn btn-primary mt-3">Enviar</div>
    </div>
    <hr>
    <div class="row m-0 px-4">
    <div class="col">
      <h4 class="my-4">Productos relacionados</h4>
      <div class="row" id="related">
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
    let button_part = document.getElementById("button_part");
    var button_content = '';
    (data.images).forEach((element,idx) => {
      
      var is_active = '';
      if(idx === 0) {is_active = 'active';}
      
      image_content += `
        <div class="carousel-item ${is_active}">
          <img src="${element}" class="w-100 img-thumbnail shadow">
        </div>`

        if (idx > 0){
          button_content += `
          <button type="button" data-bs-target="#carruselito" data-bs-slide-to="${idx}" aria-label="Slide ${idx+1}"></button>
          `
        }
    });
    imagenes.innerHTML = image_content;
    button_part.innerHTML += button_content;
}

// function to add related products
function fillRelated(data){
  let related_prods = document.getElementById("related")
  let related_content = '';
  (data.relatedProducts).forEach(element => {
      related_content += `
      <div class="related_item col-sm-12 col-md-6 col-lg-3 p-2" style="min-width: 300px;" onclick="{guardarIdentificador(${element.id})}">
          <img class="img-thumbnail shadow" src="${element.image}" alt="">
          <p class="px-2 pt-1"><b>${element.name}</b></p>
      </div>`
  });
  related_prods.innerHTML = related_content;
}

// Function to save product identifier
function guardarIdentificador(id){
  localStorage.setItem('id', id);
  window.location = "product-info.html";
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

function make_button_work(){

  let content = '';
  const boton = document.getElementById('btn');
  
  boton.addEventListener('click', ()=>{
    const user = localStorage.getItem('personal_email');
    const user_comment = document.getElementById('comentario');
    const user_points = document.getElementById('puntos');
    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  
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

}

// get object from data
function get_object(data){
  var item_object = {
    "id": data.id,
    "name": data.name,
    "count": 1,
    "unitCost": data.cost,
    "currency": data.currency,
    "image": data.images[0]
  }
  localStorage.setItem('item_object', JSON.stringify(item_object))
}

// function to add to shopping cart
function add_to_cart(){
  item_cart_list = [];
  let item_object = JSON.parse(localStorage.getItem('item_object'));
  if(JSON.parse(localStorage.getItem('cart_items_LS')) == null){
    item_cart_list.push(item_object);
    localStorage.setItem('cart_items_LS', JSON.stringify(item_cart_list));
  }
  else{
    let item_cart_list = JSON.parse(localStorage.getItem('cart_items_LS'));
    item_cart_list.push(item_object);
    localStorage.setItem('cart_items_LS', JSON.stringify(item_cart_list));
  }
}


