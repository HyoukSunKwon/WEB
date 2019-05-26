var movieImgD = localStorage.getItem("movieImgD");
console.log(movieImgD);
var movieInfoD =  JSON.parse(localStorage.getItem("detailInfo"));

var div =  document.querySelector("#detail");

var key = "6b6223d7e595b8937b732cbc63558f05";

var xhr = new XMLHttpRequest();
window.addEventListener("load", function(){
  var urlMovieDetail = "https://api.themoviedb.org/3/movie/" + movieImgD + "/videos?api_key=" + key;
  console.log(urlMovieDetail);
  xhr.open("GET", urlMovieDetail);
  xhr.send();
  xhr.addEventListener("readystatechange", detail);
});

function detail(){
  if (xhr.readyState == 4){
    var response = JSON.parse(xhr.responseText);


    var divEachItem = document.createElement("div");
    divEachItem.setAttribute("id", "item");
    var divImg = document.createElement("div");
    divImg.setAttribute("id", "imgMovie");
    var divMovieInfo = document.createElement("div");
    divMovieInfo.setAttribute("id", "inforMovie");

    //Image of Movie
    var mImg = document.createElement("a");
    mImg.setAttribute("onclick", "localstorage(this);");
    mImg.setAttribute("id", movieInfoD.id);
    
   
    //aImg.setAttribute("")
    var picture = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";
    var movieImg = document.createElement("img");
    movieImg.setAttribute("src", picture + movieInfoD.poster_path);
    mImg.appendChild(movieImg);
    divImg.appendChild(mImg);

    //Information of Movie (title, vote_average, overview, release_date)
    var movieInfor = document.createElement("p");
    movieInfor.innerHTML += "<b>" + movieInfoD.title + "</b>";
    movieInfor.innerHTML += "<br> Rating: " + movieInfoD.vote_average * 10 + "%";
    movieInfor.innerHTML += "<br>" + movieInfoD.overview;
    movieInfor.innerHTML += "<br> Release date: " + movieInfoD.release_date;
    divMovieInfo.appendChild(movieInfor);

    divEachItem.appendChild(divImg);
    divEachItem.appendChild(divMovieInfo);

    div.appendChild(divEachItem);

    // //Trailer
    var divTrailer = document.createElement("div");
    divTrailer.setAttribute("class", "trailer");
    for (var i=0;i<response.results.length;i++){
      if (response.results[i].type == "Trailer"){
        console.log(response.results[i].key);
        divTrailer.innerHTML += '<iframe width="420" height="345" src="https://www.youtube.com/embed/' + response.results[i].key + '"></iframe>';
      }
    }

    div.appendChild(divTrailer);
  }
}