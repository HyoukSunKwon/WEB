
// ajax
var xhr = new XMLHttpRequest();

window.addEventListener("load", function(){
  var movieurl = "https://api.themoviedb.org/3/movie/now_playing?api_key=6b6223d7e595b8937b732cbc63558f05&language=en-US&page=1";
  
  xhr.open("GET", movieurl);
  xhr.send();
  xhr.addEventListener("readystatechange", currentlyMovies);
});

 var div = document.querySelector("#result"); 
 var response;
 var id;
 var title;

// het the information
function currentlyMovies (){
 
  if (xhr.readyState == 4){
    
    response= JSON.parse(xhr.responseText);
    

    var picture = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
    
  
    for(var i=0; i< response.results.length ; i++) {
      
     //create div
      var divEachItem = document.createElement("div");
      divEachItem.setAttribute("id", "item");
      var divImg = document.createElement("div");
      divImg.setAttribute("id", "imgMovie");
      var divMovieInfo = document.createElement("div");
      divMovieInfo.setAttribute("id", "inforMovie");

      //Image of Movie
      var mImg = document.createElement("a");
      mImg.setAttribute("onclick", "localstorage(this);");
      mImg.setAttribute("id", response.results[i].id);
      
     
      //aImg.setAttribute("")
      var movieImg = document.createElement("img");
      movieImg.setAttribute("src", picture + response.results[i].poster_path);
      mImg.appendChild(movieImg);
      divImg.appendChild(mImg);

      //Information of Movie (title, vote_average, overview, release_date)
      var movieInfor = document.createElement("p");
      movieInfor.innerHTML += "<b>" + response.results[i].title + "</b>";
      movieInfor.innerHTML += "<br> Rating: " + response.results[i].vote_average * 10 + "%";
      movieInfor.innerHTML += "<br>" + response.results[i].overview;
      movieInfor.innerHTML += "<br> Release date: " + response.results[i].release_date;
      divMovieInfo.appendChild(movieInfor);

      divEachItem.appendChild(divImg);
      divEachItem.appendChild(divMovieInfo);

      div.appendChild(divEachItem);
    }
  } 
}

function getInfoDetail(id){
  for( var i = 0 ; i < response.results.length; i++)
  if(response.results[i].id == id)
  return response.results[i];
}

function localstorage(e){
  localStorage.setItem("movieImgD", e.id);
  localStorage.setItem('detailInfo', JSON.stringify(getInfoDetail(e.id)));
  location.href = 'detail.html';
}

