
const weather = document.querySelector(".js-weather"),
    weatherTitle = document.querySelector(".status-bar__weather"),
    tempTitle = document.querySelector(".status-bar__temp"),
    placeTitle = document.querySelector(".status-bar__place");
const API_KEY = "b7f819b6c372ecaf5dad13c1e10f29c8";
const COORDS ="coords";

function round(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temp = round(json.main.temp, 1);
        const place = json.name;
        const weatherMain = json.weather[0].main;
        weatherTitle.innerText = `${weatherMain}`;
        tempTitle.innerText = `${temp}°C`;
        placeTitle.innerText = `${place}`;
    });

}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position){
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude,
       longitude 
   };
   saveCoords(coordsObj);
   getWeather(latitude, longitude);
}
function handleGeoError(){
    console.log('cannot access');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();