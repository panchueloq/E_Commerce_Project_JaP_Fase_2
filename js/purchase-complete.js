const btn = document.getElementById('btn');
const ref_num = document.getElementById('ref_num');

btn.addEventListener('click', ()=>{
    window.location = 'home.html';
})

let the_num = Math.floor(Math.random()*1000000000)
ref_num.innerText = the_num;
