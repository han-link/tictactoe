import "./main.css";

console.log(window.location.origin);

function setPlayerNames() {
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    sessionStorage.setItem("player1", player1);
    sessionStorage.setItem("player2", player2);
    if (player1 !== "" && player2 !== "") {
        let inputFields = document.querySelectorAll("input[type=text]");
        inputFields.forEach(element => {
            element.style.border = "none";
        })
        window.location.href = window.location.origin + "/tictactoe.html";
    }
    else {
        let inputFields = document.querySelectorAll("input[type=text]");
        inputFields.forEach(element => {
            element.style.border = "2px solid red";
        })
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        setPlayerNames();
    })
});