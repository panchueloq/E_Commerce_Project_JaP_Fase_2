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
    let storage = JSON.parse(localStorage.getItem('cart_items_LS'));
    if (storage == '' || storage == null){
        let data = await getData();
        item_to_local_storage(data);
    }
    add_from_LS();
    calculate_costs();
})

let cart_items = [];
// function to set item to LS
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

// function to add item to cart HTML from LS
function add_from_LS(){
    cart_items = JSON.parse(localStorage.getItem('cart_items_LS'));
    const container = document.getElementById('cart_items');
    let content = '';
    cart_items.forEach(item => {
        content += `
        <div class="item_div row mt-2 align-items-center d-flex justify-content-around" id="${item.id}">
            <div class="col-md-2 d-none d-md-block text-center">
                <img src="${item.image}" style="max-width: 60px; max-height: 60px;">
            </div>
            <div class="col-2 col-md-3">${item.name}</div>
            <div class="cost_div col-2">${item.currency} <span>${item.unitCost}</span></div>
            <div class="input_div col-2"><input type="number" min ="1" value="${item.count}" style="max-width: 70px;" onchange="check_input(${item.id})"></div>
            <div class="span_div col-2"><b>${item.currency} <span>${item.unitCost*item.count}</span></b></div>
            <div class="col-1"><i class="bi bi-trash3-fill text-danger eliminate_cart_item" onclick="erase_item(${item.id})"></i></div>
        </div>
        <hr class="p-0 m-0 mt-1">` 
    });
    container.innerHTML = content;
}

// function to modify count value when changing input
function check_input(index){
    let item = document.getElementById(`${index}`);
    cart_items = cart_items.map(object =>{
        if (object.id === index){
            if(item.querySelector('.input_div > input').value < 1){
                object.count = 1;
            }
            else{
                object.count = item.querySelector('.input_div > input').value; 
            }
        }
        return object;
    })
    localStorage.setItem('cart_items_LS', JSON.stringify(cart_items));
    add_from_LS();
    calculate_costs();
}

// function to erase items
function erase_item(index){
    cart_items = cart_items.filter(item => item.id != index);
    localStorage.setItem('cart_items_LS', JSON.stringify(cart_items));
    add_from_LS();
    calculate_costs();
}

// function to calculate costs
function calculate_costs(){
    let storage = JSON.parse(localStorage.getItem('cart_items_LS'));
    let cost = 0;
    storage.forEach(item => {
        if(item.currency == 'UYU'){
            cost += (item.unitCost*item.count)/40;
        }
        else{
            cost += item.unitCost*item.count;
        }
    });
    let prod_cost = document.getElementById("prod_cost");
    let delivery_cost = document.getElementById("delivery_cost");
    let total_cost = document.getElementById('total_cost');

    let deli_1 = document.getElementById('deliveryoption1');
    let deli_2 = document.getElementById('deliveryoption2');
    let deli_3 = document.getElementById('deliveryoption3');
    
    prod_cost.innerHTML = cost.toFixed(0);

    if(deli_1.checked){
        delivery_cost.innerHTML = (prod_cost.innerHTML*0.15).toFixed(0);
    }
    else if(deli_2.checked){
        delivery_cost.innerHTML = (prod_cost.innerHTML*0.07).toFixed(0);
    }
    else if(deli_3.checked){
        delivery_cost.innerHTML = (prod_cost.innerHTML*0.05).toFixed(0);
    }

    total_cost.innerHTML = parseInt(prod_cost.innerHTML) + parseInt(delivery_cost.innerHTML);
}