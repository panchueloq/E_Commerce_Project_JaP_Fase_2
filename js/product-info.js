// async function to get data
async function getData(){
    let link = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('id')}.json`
    let respuesta = await fetch(link);
    if (respuesta.ok){
        let data = await respuesta.json();
        return data;
    }
}

// async function to work with data
document.addEventListener('DOMContentLoaded', async function(){
    let data = await getData();
    add_to_html(data);
    fillImages(data);
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
        <div class="row" id="imagenes">
        </div>
    </div>
    </div>
    <hr>
    <div class="row m-0 px-4">
    <div class="col">
      <h4>COMENTARIOS</h4>
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

