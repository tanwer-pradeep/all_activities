

function generateUrl(path){
    let url =`https://api.themoviedb.org/3${path}?api_key=d6bed68fef0d22e8c3aba9bc0166c870`
     return url
}

function searchMovie(value){
    let url = generateUrl('/search/movie')+"&query="+value;
    requestmovies(url,rendersearchmovies, errorhandling)
}

function requestmovies(url, oncomplete,onError){
    fetch(url)
    .then((res) => res.json())
    .then((oncomplete))
    .catch(onError);
}

function getupcoming(){
    let url = generateUrl('/movie/upcoming');
    let render = rendermovies.bind({title:'Upcoming Movies'});
    requestmovies(url,render, errorhandling)
}

function getToprated(){
    let url = generateUrl('/movie/top_rated');
    let render = rendermovies.bind({title:'Top Movies'});
    requestmovies(url,render, errorhandling)
}

function getPopular(){
    let url = generateUrl('/movie/popular');
    let render = rendermovies.bind({title:'Popular Movies'});
    requestmovies(url,render, errorhandling)
}