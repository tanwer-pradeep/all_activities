const addmodal = document.getElementById('head');
const modal = document.getElementById('modal');
const closemodal = document.getElementById('close-modal');
const website_name = document.getElementById('website-name');
const website_url = document.getElementById('website-url');
const bookmarkform = document.getElementById('bookmark-form');
const bookmar_container = document.getElementById('bookmark-container');




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

function validateform(name, url){
    

    // regex for url
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);
    if(!url.match(regex)){
        alert('Please enter valid url');
        return false;
    }
    return true; 
}

bookmarkform.addEventListener('submit', (e) =>{
    e.preventDefault();
    const name = website_name.value;
    let url = website_url.value;

    if(!name || !url){
        alert('please submit both fields.');
        return false;
    } 
    if(!url.includes('http://', 'https://')){
        url = `https://${url}`;
    }

    
    if(!validateform(name, url)){
        return false; 
    }    

    console.log(`name:- ${name}, url:- ${url}`);
// main div containing  the bookmark
    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    // close btn of bookmark
    const closeicon = document.createElement('i');
    closeicon.setAttribute('class',"far fa-times-circle");
    closeicon.setAttribute('title', 'Delete Bookmark');

    // div containing name and address
    const bname = document.createElement('div');
    bname.setAttribute('class', 'name');

    // favicon img
    const img = document.createElement('img');
    img.setAttribute('src',"https://img.icons8.com/color/30/000000/bookmark-ribbon--v2.png");

    // address of the bookmark
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('target', "_blank");
    link.innerText = name;

    // appending each element to insider div
    bname.appendChild(img);
    bname.appendChild(link);

    // appending close icon and name with favicon to main container
    item.appendChild(closeicon);
    item.appendChild(bname);


    //finally appending element to bookmark-container
    bookmar_container.appendChild(item);

    

    
    
})


