let searchbtn = document.querySelector("#Search");
let input = document.querySelector("#inputValue");
let moviesearchable = document.getElementById('movie-searchable');
let link = 'https://image.tmdb.org/t/p/w500'
let moviescontainer = document.getElementById('movie-container');


function errorhandling(err){
    console.log(err);
}

function rendersearchmovies(data){
    moviesearchable.innerHTML = '';
    let movieblock = createmoviecontainer(data.results);
    moviesearchable.appendChild(movieblock);
}

function rendermovies(data){
    
    let movieblock = createmoviecontainer(data.results, this.title);
    moviescontainer.appendChild(movieblock);
}


function createvideo(data, content){
    content.innerHTML = '<p id="content-close">X</p>';
    let videos = data.results;
    let length = videos.length >4? 4 : videos.length
    let iframecontainer = document.createElement('div');
    for(let i= 0; i < length; i++){
        let video = videos[i];
        let iframe = creatiframe(video);
        iframecontainer.appendChild(iframe);
        content.appendChild(iframecontainer);
    }
    
}

function creatiframe(video){
    let iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`
    iframe.width = 300;
    iframe.height = 300;
    iframe.allowFullscreen = true;

    return iframe;
}



searchbtn.addEventListener("click",function(){
    let movie = input.value;
    searchMovie(movie);
    input.value = '';
}); 

function movieSection(movies){
    return movies.map((movie) =>{
        if(movie.poster_path){
            let c =`<img
            src=${link + movie.poster_path}
            data-movie-id=${movie.id}>`
            return c;
        }
    })
}

function createmoviecontainer(movies, title =''){ 
    let movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    let movieTemplate = `
        <h2>${title}</h2>
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content"> 
            <p id="content-close">x</p>
        </div> 
    `
    movieElement.innerHTML = movieTemplate;
    return movieElement;
}


document.addEventListener('click',function(event){
    let target = event.target;
    if(target.tagName.toLowerCase() === 'img'){
        let movie_id = target.dataset.movieId;
        let section = event.target.parentElement;
        let content = section.nextElementSibling;
        content.classList.add('content-display');
        let path = `/movie/${movie_id}/videos`
        newurl = generateUrl(path);
        fetch(newurl)
            .then((res) => res.json())
            .then((data)=> createvideo(data, content))
            .catch((error) => {
                console.log('Error :- ', error);
            })
    }

    if(target.id ==='content-close'){
        console.log(target.id);
        let content = target.parentElement;
        content.classList.remove('content-display');
    }
});



getupcoming();
getToprated();
getPopular();
