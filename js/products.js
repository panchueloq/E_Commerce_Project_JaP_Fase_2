// Arrays where categories are loaded
let cat = [];
let cats = [];

// Asynchronous loading of data
async function getData() {
    let answer = await fetch(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`);
    if (answer.ok) {
        information = await answer.json();
        return information;
    }
    else {
        console.log(answer.statusText);
    }
}

// Asynchronous storing of loaded data & function excecution
document.addEventListener('DOMContentLoaded', async function() {
    cats = await getData();
    cat = cats.products;
    document.querySelector('.lead').innerHTML = `Verás aquí todos los productos de la categoría ${cats.catName}`
    showProducts(cat);
})

// Function to fill HTML with content
function showProducts(array) {
    array.forEach(element => {
        let htmlContentToAppend = `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-md-3">
                    <img src="${element.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="p-1">
                            <h4>${element.name} - ${element.currency} ${element.cost}</h4> 
                            <p>${element.description}</p> 
                        </div>
                        <small class="text-muted p-1">${element.soldCount} vendidos</small> 
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-2"></div>
        `
        document.getElementById('cat-list-container').innerHTML += htmlContentToAppend;
        
    });
}


