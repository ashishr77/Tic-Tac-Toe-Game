const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");

const msg = document.querySelector(".msg");
const msgcontainer = document.querySelector(".msg-con");

const soundStep = new Audio("sound/step.wav");
const SoundWin = new Audio("sound/win.wav");

const winningPatterns = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

let turn0 = true;

boxes.forEach(box => {
    box.addEventListener("click", () => {
        soundStep.play();  //Play Sound

        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disable = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (win) => {
    SoundWin.play();
    msg.innerText = `Bingo! Winner is ${win}`;
    msgcontainer.classList.remove("hide");
    disable();
};

const drawGame = (win) => {
    SoundWin.play();
    msg.innerText = "Game Is Draw! Click to restart !";
    msgcontainer.classList.remove("hide");
    disable();
};

function checkWinner() {
    let isDraw = true;
    for (let pattern of winningPatterns) {    
        let box1 = boxes[pattern[0]].innerText;
        let box2 = boxes[pattern[1]].innerText;
        let box3 = boxes[pattern[2]].innerText;

        if (box1 !== "" && box2 !== "" && box3 !== "") {
            if (box1 === box2 && box2 === box3) {
                showWinner(box1);
                return;
            }
        } 
        else {
            isDraw = false;
        }
    }

    if (isDraw) {
        drawGame();
    }
}

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    msg.innerText = "";
    msgcontainer.classList.add("hide");
    turn0 = true;
};

reset.addEventListener("click", resetGame);
