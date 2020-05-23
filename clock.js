const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".status-bar__clock");

const weekday_list = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];


function getDay(day){
    return weekday_list[day];
}

function getMonth(month){
    return month_list[month];
}

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const year = date.getFullYear();
    const month = getMonth(date.getMonth()+1);
    const day = date.getDate();
    const weekday = getDay(date.getDay());


    clockTitle.innerText = `${month} ${day} (${weekday}) ${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes}`;
    // clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}`: seconds}`;
}

function init(){
    setInterval(getTime, 1000);
}

init();