const buttonList = document.querySelectorAll(".playgroundButton");
const playerInfo = document.getElementById("playerInfo");
const donut = "/static/icon/donut.svg";
playerInfo.innerHTML = sessionStorage.getItem('player1') + " ist am Zug"

let player = 1;

function checkIfNamesInSessionStorage(){
    if(sessionStorage.getItem('player1') === "" ||sessionStorage.getItem('player2') === "" ){
        history.back();
    }
}

checkIfNamesInSessionStorage();

let playground = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];

function createNewGame(){
    window.location.href = window.location.origin + "/";
}

function updatePlayground(pushedButton, player) {
    playground[pushedButton.getAttribute("y")][pushedButton.getAttribute("x")] = player;

}

function isDescribed(pushedButton) {
    if (playground[pushedButton.getAttribute("y")][pushedButton.getAttribute("x")] != null){
        return true;
    }
}

function validatePlayground() {
    let validationRows = [];
    let validationColumns = [];
    let validationDiagonal = [];
    let summe = 0;
    
    playground.forEach(function(element){
            element.forEach(innerElement => summe = summe + innerElement)
            validationRows.push(summe);
            summe = 0;
        }
    )

    for(let i = 0; i < 3; i++){
        summe = 0;
        playground.forEach(element => summe = summe + element[i])
        validationColumns.push(summe);
    }

    summe = 0;
    
    for(let i = 0; i < 3; i++){
        summe = summe + playground[i][i];
    }

    validationDiagonal.push(summe);
    summe = 0;

    for(let i = 0, k = 2; i < 3; i++, k--) {    
        summe = summe + playground[i][k]
    }

    validationDiagonal.push(summe);

    if(validationRows.includes(3)||validationColumns.includes(3)||validationDiagonal.includes(3)){
        const burger = document.querySelectorAll('.burger');
        burger.forEach(element => {
            element.classList.add('fall-out');
        });
        return sessionStorage.getItem('player1');
    }
    else if(validationRows.includes(30)||validationColumns.includes(30)||validationDiagonal.includes(30)){
        const donut = document.querySelectorAll('.donut');
        donut.forEach(element => {
            element.classList.add('fall-out');
        });
        return sessionStorage.getItem('player2');
    }
    else {
        return false;
    }
    
}

function compute(event){
    const button = event.currentTarget;
        if (isDescribed(button))
            return;

        if (player === 1) {
            button.classList.add("donut");
            updatePlayground(button, player);
            if(validatePlayground() !== false){
                document.getElementById('win').style.display = "block";
                document.getElementById('win').innerHTML = validatePlayground() + " hat gewonnen";
                disableButtons();
                return
            }
            else {
                playerInfo.innerHTML = sessionStorage.getItem('player2') + " ist am Zug"
                player = 10;
                return;
            }
        }
        if (player === 10) {
            button.classList.add("burger");
            updatePlayground(button, player);
            if(validatePlayground() !== false){
                document.getElementById('win').style.display = "block";
                document.getElementById('win').innerHTML = validatePlayground() + " hat gewonnen";
                disableButtons();
            }
            else {
                playerInfo.innerHTML = sessionStorage.getItem('player1') + " ist am Zug"
                player = 1;
            }
        }
}

function disableButtons(){
    for (let i = 0; i < buttonList.length; i++){            
        buttonList[i].removeEventListener("click", compute)
    }
}

function initButtons(){
    for (let i = 0; i < buttonList.length; i++){            
        buttonList[i].addEventListener("click", compute);
    }
}

function resetGame() {
    playground = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
    ];
    buttonList.forEach(element => {
        element.classList.remove("donut");
        element.classList.remove("burger");
        element.classList.remove("fall-out");
    });
    player = 1;
    playerInfo.innerHTML = sessionStorage.getItem('player1') + " ist am Zug"
    document.getElementById('win').style.display = "none";
    initButtons();
}

initButtons();