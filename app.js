const grid = document.querySelector('.grid');
let squares = Array.from($('.grid div'));
const w = 10;
var timerID;
var nextBlock;
var started;
var score = 0;

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
  var isOutOfBound = cur.some(index => (curPosition + index) % w === w - 1) &&
    cur.some(index => (curPosition + index) % w === 0);
  // console.log(isOutOfBound);
  if(isOutOfBound) {
    curRotation = (curRotation + 3) % 4;
    cur = tetrominoes[curBlock][curRotation];
  }
  draw();
}

// function allMoveDown() {
//   var allIndex = Array.from(Array(200).keys());
//   allIndex.forEach(index => {
//     if (squares[index].classList.contains('taken')) {
//       squares[index].classList.remove('taken', 'tetromino');
//       squares[index + w].classList.add('taken', 'tetromino');
//     }
//   });
// }

function newBlock() {
  curBlock = nextBlock;
  curRotation = Math.floor(Math.random() * tetrominoes[curBlock].length);
  cur = tetrominoes[curBlock][curRotation];
  curPosition = 4;
  if(cur.some(index => squares[index+curPosition].classList.contains('taken'))){
    console.log('END');
    gameOver();
  }
  draw();
  nextBlock = Math.floor(Math.random() * tetrominoes.length);
  displayShape();
}

function clearFullRows() {
  for (let i=0; i<199;i+=w){
    const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9];
    let full = row.every(index => squares[index].classList.contains('taken'));
    // console.log(full);
    if (full) {
      score+=10;
      $('.score').text(score);
      row.forEach(index => squares[index].classList.remove('taken','tetromino'));
      let squaresRemoved = squares.splice(i,w);
      // console.log(squaresRemoved);
      squares = squaresRemoved.concat(squares);
      // console.log(squares);
      squares.forEach(cell => grid.appendChild(cell));

    }
  }
}

function freeze() {
  if (cur.some(index => squares[curPosition + index].classList.contains('taken'))) {
    curPosition -= w;
    draw();
    cur.forEach(index => squares[curPosition + index].classList.add('taken'));
    clearFullRows();
    newBlock();
  } else {
    draw();
  }
}

function gameOver() {
  $('.title-text').html('GAME OVER');
  $('.title-text').css('color','#ff414d');
  clearInterval(timerID);
  $(document).off('keydown', control);
}

function control(event) {
  console.log(event.key);
  switch (event.key) {
    case 'a':
    case 'ArrowLeft':
      moveLeft();
      break;
    case 's':
    case 'ArrowDown':
      moveDown();
      break;
    case 'd':
    case 'ArrowRight':
      moveRight();
      break;
    case 'w':
    case ' ':
    case 'ArrowUp':
    case 'Enter':
      rotate();
      break;
    default:
  }
}

const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

const upNextTetromino = [
  [1, 2, 1 + displayWidth, 1 + displayWidth * 2],
  [displayWidth * 2, 1 + displayWidth, 1 + displayWidth * 2, 2 + displayWidth * 1],
  [1, displayWidth, 1 + displayWidth, 2 + displayWidth],
  [0, 1, displayWidth, 1 + displayWidth],
  [1, 1 + displayWidth, 1 + displayWidth * 2, 1 + displayWidth * 3]
];



function displayShape() {
  $('.mini-grid div').each(function(){
    $(this).removeClass('display');
  });
  upNextTetromino[nextBlock].forEach(index => {
    displaySquares[displayIndex+index].classList.add('display');
  })
}

//start
$('.start-btn').click(function(){
  if(!started){
    $('.start-btn').text('RESET');
    started = true;
    timerID = setInterval(moveDown, 1000);
    nextBlock = Math.floor(Math.random() * tetrominoes.length);
    $(document).on('keydown',control);
    $('.next-area').css('display','block');
    newBlock();
    draw();
  }
  else {
    $('.start-btn').text('START');
    started = false;
    clearInterval(timerID);
    $(document).off('keydown', control);
    $('.title-text').text('TETRIS');
    $('.score').text('0');
    $('.level').text('1');
    $('.next-area').css('display','none');
    $('.grid div').each(function(){
      if(!$(this).hasClass('hidden')){
        $(this).removeClass('taken tetromino');
      }
    });
    // $('.mini-grid div').each(function(){
    //   $(this).removeClass('display');
    // });
  }
});
