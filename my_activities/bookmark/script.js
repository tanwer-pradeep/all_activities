const addmodal = document.getElementById('head');
const modal = document.getElementById('modal');
const closemodal = document.getElementById('close-modal');
const website_name = document.getElementById('website-name');
const website_url = document.getElementById('website-url')



addmodal.addEventListener('click', () =>{
    modal.classList.add('show');
    website_name.focus();
})

closemodal.addEventListener('click', () =>{
    modal.classList.remove('show');
})

document.addEventListener('click', (e) =>{
    if(e.target === modal){
        modal.classList.remove('show')
    }
    
})


