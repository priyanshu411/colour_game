let noOfPlayers=window.onload=prompt("how many player");

const NO_OF_BOXES = 12;
const COLOUR_LIST = ['yellow', 'green', 'pink','blue'];
const DEFAULT_COLOUR='#3498db'
generateBox();
let currentPlayer = 1;
let isFlipped = false;
let isColourGenerate = true;
let rotationAngle = 0;
let generatedColour;

let scores = Array.from({ length: noOfPlayers }, () => 0); // Scores for each player


// Generate colours for boxes
const colourForBoxes = Array.from({ length: NO_OF_BOXES }, () => getRandomColour());

function getRandomColour() {
    return COLOUR_LIST[Math.floor(Math.random() * COLOUR_LIST.length)];
}

function flipCard(element) {
    if (isFlipped) {
        
        isFlipped = false;
        element.classList.toggle('flipped');
        const value = element.getAttribute('value');
        const boxColor = colourForBoxes[value];

        document.getElementById(value).style.backgroundColor = boxColor;

        if (isColourSame(boxColor, generatedColour)) {
            updateScore();
            setTimeout(() => {
                element.style.display = 'none';
                checkGameEnd();
            }, 2000);
        } else {
            changePlayer();
            setTimeout(() => {
                element.classList.toggle('flipped');
                document.getElementById(value).style.backgroundColor = DEFAULT_COLOUR;
            }, 2000);
        }

        isColourGenerate = true; // reset to generate colour again
        document.getElementById("score").innerHTML=`${scores.map((score, index) => `Player ${index + 1} Score: ${score}`).join('\n')}`;
    }
}

function generateColour() {
    if (isColourGenerate) {

        console.log(currentPlayer);

        const colorBox = document.getElementById('rotateBox');
        const randomColorIndex = Math.floor(Math.random() * COLOUR_LIST.length);

        rotationAngle += 360;
        colorBox.style.backgroundColor = COLOUR_LIST[randomColorIndex];
        generatedColour = COLOUR_LIST[randomColorIndex];
        colorBox.style.transform = `rotate(${rotationAngle}deg)`;
        isFlipped = true;
        isColourGenerate = false; // you can not generate colour before flipping/selecting any box
    }
}

function isColourSame(boxColour, generatedColour) {
    return boxColour === generatedColour;
}

function changePlayer() {
    currentPlayer = (currentPlayer % noOfPlayers) + 1; // Switch between players
}

function updateScore() {
    scores[currentPlayer - 1]++;
}

function checkGameEnd() {
    // Check if all boxes are hidden
    if (document.querySelectorAll('.box .card[style*="display: none;"]').length === NO_OF_BOXES) {
        isColourGenerate = false; // you can not generate colour before flipping/selecting any box
        endGame();
    }
}

function endGame() {
    const maxScore = Math.max(...scores);
    const winners = scores.reduce((acc, score, index) => {
        if (score === maxScore) {
            acc.push(`Player ${index + 1}`);
        }
        return acc;
    }, []);

    if (winners.length === 1) {
        alert(`Game Over!\n${scores.map((score, index) => `Player ${index + 1} Score: ${score}`).join('\n')}\n${winners[0]} wins!`);
    } else {
        alert(`Game Over!\nIt's a tie between ${winners.join(' and ')}!`);
    }
    // You can add more logic or UI updates for the end of the game as needed
}


// generate boxes
function generateBox(){
     let boxHtml='';
     for(let i=0;i<NO_OF_BOXES;i++){
        boxHtml+= `<div class="box">
        <div class="card" onclick="flipCard(this)" value="${i}">
          <div class="front"></div>
          <div class="back" id="${i}"></div>
        </div>
      </div>`;
     }
     document.getElementById("box-container").innerHTML=boxHtml;
}