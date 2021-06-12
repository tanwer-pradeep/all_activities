let showrule = document.querySelector(".rules-btn");
let rules = document.querySelector("#rules");
showrule.addEventListener("click",function(){
    rules.classList.add('show');
    return;
})

let closebtn = document.querySelector('#close-btn');
closebtn.addEventListener('click',()=>{
    rules.classList.remove('show');
})