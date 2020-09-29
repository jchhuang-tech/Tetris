const grid = $('.grid');
let squares = Array.from($('.grid div'));
const w = 10;

const lTetromino = [
  [1, 2, 1 + w, 1 + w * 2],
  [w, 1 + w, 2 + w, 2 + w * 2],
  [1, 1 + w, 1 + w * 2, w * 2],
  [w, w * 2, 1 + w * 2, 2 + w * 2]
];

const zTetromino = [
  [w * 2, 1 + w, 1 + w * 2, 2 + w * 1],
  [0, w, 1 + w, 1 + w * 2],
  [w * 2, 1 + w, 1 + w * 2, 2 + w * 1],
  [0, w, 1 + w, 1 + w * 2]
];

const tTetromino = [
  [1, w, 1 + w, 2 + w],
  [1, 1 + w, 1 + w * 2, 2 + w],
  [w, 1 + w, 2 + w, 1 + w * 2],
  [w, 1, 1 + w, 1 + w * 2]
];

const oTetromino = [
  [0, 1, w, 1 + w],
  [0, 1, w, 1 + w],
  [0, 1, w, 1 + w],
  [0, 1, w, 1 + w]
];

const iTetromino = [
  [1, 1 + w, 1 + w * 2, 1 + w * 3],
  [w, w + 1, w + 2, w + 3],
  [1, 1 + w, 1 + w * 2, 1 + w * 3],
  [w, w + 1, w + 2, w + 3]
];

const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

var timerID = setInterval(moveDown, 1000);
// let curPosition = 4;
// let curRotation = 0;
// let random = Math.floor(Math.random() * tetrominoes.length);
// let curBlock = random;
// let cur = tetrominoes[0][0];
// let randomTet = tetrominoes[curBlock];



function draw() {
  cur.forEach(index => {
    squares[curPosition + index].classList.add('tetromino');
  })
};

function undraw() {
  cur.forEach(index => {
    squares[curPosition + index].classList.remove('tetromino');
  })
};

function moveDown() {
  undraw();
  curPosition += w;
  freeze();
}

function moveRight() {
  undraw();
  var isAtRightEdge = cur.some(index => (curPosition + index) % w === w - 1);
  if (!isAtRightEdge) curPosition++;
  if (cur.some(index => squares[curPosition + index].classList.contains('taken'))) {
    curPosition--;
  }
  draw();
}

function moveLeft() {
  undraw();
  var isAtLeftEdge = cur.some(index => (curPosition + index) % w === 0);
  if (!isAtLeftEdge) curPosition--;
  if (cur.some(index => squares[curPosition + index].classList.contains('taken'))) {
    curPosition++;
  }
  draw();
}

function rotate() {
  undraw();
  curRotation = (curRotation + 1) % 4;
  cur = tetrominoes[curBlock][curRotation];
  draw();
}

function allMoveDown() {
  var allIndex = Array.from(Array(200).keys());
  allIndex.forEach(index => {
    if (squares[index].classList.contains('taken')) {
      squares[index].classList.remove('taken', 'tetromino');
      squares[index + w].classList.add('taken', 'tetromino');
    }
  });
}

function newBlock() {
  // if(squares.slice(190,200).every(index => index.classList.contains('taken'))){
  //   squares.slice(190,200).forEach(index => index.classList.remove('taken','tetromino'));
  //   allMoveDown();
  // }
  curBlock = Math.floor(Math.random() * tetrominoes.length);
  curRotation = Math.floor(Math.random() * tetrominoes[curBlock].length);
  cur = tetrominoes[curBlock][curRotation];
  curPosition = 4;
  draw();
}

function freeze() {
  if (cur.some(index => squares[curPosition + index].classList.contains('taken'))) {
    curPosition -= w;
    draw();
    cur.forEach(index => squares[curPosition + index].classList.add('taken'));
    // curBlock = Math.floor(Math.random() * tetrominoes.length);
    // cur = tetrominoes[curBlock][curRotation];
    // curPosition = 4;
    newBlock();
    if (cur.some(index => squares[curPosition + index].classList.contains('taken'))) {
      endGame();
    }

  } else {
    draw();
  }
}

function endGame() {
  $('.level-title').html('GAME OVER');
  clearInterval(timerID);
  $(document).off('keydown');
}

$(document).keydown(function(event) {
  console.log(event);
  switch (event.key) {
    case 'a':
      moveLeft();
      break;
    case 's':
      moveDown();
      break;
    case 'd':
      moveRight();
      break;
    case 'w':
    case ' ':
      rotate();
      break;
    default:
      // code block
  }
});

newBlock();
draw();

// undraw();


// var gamePattern = [];
// var userClickedPattern = [];
// var buttonColors = ["red", "blue", "green", "yellow"];
// var gameStarted = false;
// var level = 0;
//
// function nextSequence() {
//   level++;
//   $("#level-title").text("Level "+level);
//   var randomNumber = Math.floor(Math.random()*4);
//   var randomChosenColor = buttonColors[randomNumber];
//   gamePattern.push(randomChosenColor);
//   // var audio = new Audio("sounds/"+randomChosenColor+".mp3");
//   // audio.play();
//   playSound(randomChosenColor);
//   $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
// }
//
// $(document).keydown(function(){
//   if(!gameStarted){
//     nextSequence();
//     gameStarted = true;
//     // $("#level-title").text("Level 0");
//   }
// });
//
// $(".btn").click(function(event){
//   var userChosenColor = event.target.id;
//   userClickedPattern.push(userChosenColor);
//   playSound(userChosenColor);
//   animatedPress(userChosenColor);
//   checkAnswer(userClickedPattern.length);
// });
//
// function playSound(name){
//   var audio = new Audio("sounds/"+name+".mp3");
//   audio.play();
// }
//
// function animatedPress(currentColor) {
//   $("#"+currentColor).addClass("pressed");
//   setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
// }
//
// function checkAnswer(currentLevel) {
//   if(userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]){
//     // console.log("right");
//     if(level === currentLevel){
//       setTimeout(nextSequence, 1000);
//       userClickedPattern = [];
//     }
//   }else{
//     // console.log("wrong");
//     playSound("wrong");
//     $("body").addClass("game-over");
//     setTimeout(function(){$("body").removeClass("game-over");},200);
//     $("h1").text("Game Over, Press Any Key to Restart");
//     startOver();
//   }
// }
//
// function startOver(){
//   gamePattern = [];
//   userClickedPattern = [];
//   gameStarted = false;
//   level = 0;
// }
