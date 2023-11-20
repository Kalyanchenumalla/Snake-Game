//GAME CONSTANTS AND VARIABLES
let inputDir = {x:0, y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:6, y:7}
]
food = {x:13, y:15};
//GAME FUNCTIONS
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}
function isCollide(snake) {
    // return false;
    //BUMPING ITSELF
    for(let i =1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //BUMPING INTO WALL
    if(snake[0].x >= 19 || snake[0].x <=0 || snake[0].y >= 19 || snake[0].y <=0) {
        return true
    }
}
function gameEngine() {
    // UPDATING SNAKE ARRAY AND FOOD
    if(isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert('Game Over! Press ok to play again!!');
        snakeArr = [{x:13, y:15}];
        // musicSound.play();
        score = 0;
    }
    //EAT FOOD INCREMENT SCORE REGENERATE FOOD
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore:" + hiscoreval;
        }
        scoreBox.innerHTML = 'Score: '+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;        
        food = {x: 2 + Math.round(a + (b-a)* Math.random()), y: 2 + Math.round(a + (b-a)* Math.random())}
    }
    //MOVING THE SNAKE
    for(let i = snakeArr.length-2; i>=0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //DISPLAYING SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake');
        if(index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        // snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
    //DISPLAY FOOD
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
   
}


//MAIN LOGIC STARTES HERE
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "Hiscore:" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y:1} //START THE GAME
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
         
    }
});
