const addmodal = document.getElementById('head');
const modal = document.getElementById('modal');
const closemodal = document.getElementById('close-modal');
// console.log(closemodal);
let showmodal = false;

addmodal.addEventListener('click', () =>{
    modal.classList.add('show');
    showmodal = true
})

closemodal.addEventListener('click', () =>{
    modal.classList.remove('show');
})

document.addEventListener('click', (e) =>{
    if(showmodal == true && e.target == 'div#modal.modal-container.show')modal.classList.remove('show');
    console.log(e.target);
    console.log(showmodal);
})
