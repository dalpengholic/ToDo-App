const bottom = document.querySelector("bottom-bar"),
    textTitle = document.querySelector(".bottom-bar__text"),
    authorTitle = document.querySelector(".bottom-bar__author");

const QUOTE_NUMBER = 1643;

function genRandom(){
    const number = Math.floor(Math.random()*QUOTE_NUMBER);
    return number;
}

function getQuote(){
    fetch("https://type.fit/api/quotes"
    ).then(function(response){
        return response.json();
    }).then(function(res){
        const quote = res[genRandom()];
        const text = quote.text;
        const author =  quote.author;
        textTitle.innerText = `${text}`;
        authorTitle.innerText = `${author}`;
    });
}

function init(){
    getQuote();
}

init();