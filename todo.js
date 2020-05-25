const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoAdvice = document.querySelector(".js-advice"),
    toDoList = document.querySelector(".js-toDoList");
    

const TODOS_LS = 'toDos';
const HIDING_CN = 'hiding';
const LIST_ID = makeCounter();

function makeCounter() {
    var i = 0;
    return function() {
        return i++;
    }
}


let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos
    saveToDos();

    const numList = countToDoList();
    toDoform.classList.toggle(HIDING_CN, numList >= 5);
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function makeCounter() {
    var i = 0;
    return function() {
        return i++;
    }
}


function paintToDo(text){
    const li = document.createElement("li");
    li.className = "js-toDoList_todo";
    const delBtn = document.createElement("button");
    delBtn.className = "js-toDoList_delBtn";
    const newId = toDos.length + 1;
    const span = document.createElement("span");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: toDos.length + 1
    };
    toDos.push(toDoObj);
    saveToDos();
}

function countToDoList(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const parsedToDos = JSON.parse(loadedToDos);
    return parsedToDos.length
}

function handleSubmit(event){
    event.preventDefault();  
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    
    const numList = countToDoList();
    toDoform.classList.toggle(HIDING_CN, numList >= 5);

} 

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    } 
} 

function init(){
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit)
}
init();