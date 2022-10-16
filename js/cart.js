// async function to get data
async function getData(){
    let link = `https://japceibal.github.io/emercado-api/user_cart/25801.json`
    let respuesta = await fetch(link);
    if (respuesta.ok){
        let data = await respuesta.json();
        return data;
    }
}

// async function to work with data
document.addEventListener('DOMContentLoaded', async function(){
    let data = await getData();
    item_to_local_storage(data);
    add_from_LS();
    check_positive_input();
})

let cart_items = [];

function item_to_local_storage(data){
    let item_data = data.articles[0];
    cart_item ={
        "id": item_data.id,
        "name": item_data.name,
        "count": item_data.count,
        "unitCost": item_data.unitCost,
        "currency": item_data.currency,
        "image": item_data.image
    }
    cart_items.push(cart_item);
    localStorage.setItem('cart_items_LS', JSON.stringify(cart_items));
}

// function to add item to cart from LS
function add_from_LS(){
    cart_items = JSON.parse(localStorage.getItem('cart_items_LS'));
    const container = document.getElementById('cart_items');
    let content = '';
    cart_items.forEach(item => {
        content += `
        <div class="item_div row mt-2 align-items-center">
            <div class="col-2 d-none d-md-block text-center">
                <img src="${item.image}" style="max-width: 60px; max-height: 60px;">
            </div>
            <div class="col-3 col-md-3">${item.name}</div>
            <div class="cost_div col-3 col-md-2">${item.currency} <span>${item.unitCost}</span></div>
            <div class="input_div col-3 col-md-2"><input type="number" min ="1" value="${item.count}" style="max-width: 70px;"></div>
            <div class="span_div col-3 col-md-3"><b>${item.currency} <span>${item.unitCost*item.count}</span></b></div>
        </div>
        <hr class="p-0 m-0 mt-1">` 
    });
    container.innerHTML = content;
}

// function to check positive value of "Cantidad" input
function check_positive_input(){
    let items = document.querySelectorAll('.item_div');
    items.forEach(element => {
        var input = element.querySelector('.input_div > input');
        input.addEventListener('change', ()=>{
            if (element.querySelector('.input_div > input').value < 1){
                element.querySelector('.input_div > input').value = 1
            }
        })
    })
}








// function that adds up the subtotal by item based on the "Cantidad" input
// function sub_total(){
//     const items = document.querySelectorAll('.item_div');
//     items.forEach(element => {
//         element.querySelector('.input_div ~ .span_div > b > span').innerHTML = 
//         element.querySelector('.input_div > input').value * element.querySelector('.cost_div > span').innerHTML
//     });
// }

// function that adds the change event listener to the "Cantidad" inputs
// function add_event_to_inputs(){
//     const items = document.querySelectorAll('.item_div');
//     items.forEach(element => {
//         element.querySelector('.input_div > input').addEventListener('change', ()=>{
//             sub_total();
//         })
//     })
// }
