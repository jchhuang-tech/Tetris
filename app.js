document.addEventListener('DOMContentLoaded', () => {
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
    [w * 2, 1 + w, 1 + w * 2, 2 + w * 2],
    [0, w, 1 + w, 1 + w * 2],
    [w * 2, 1 + w, 1 + w * 2, 2 + w * 2],
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

  let curPos = 4;
  let cur = tetrominoes[0][0];

  function draw() {
    cur.forEach(index => {
      squares[curPos + index].classList.add('tetromino');
    })
  };

  // function block() {
  //   newBlock();
  //
  // }
  let random = Math.floor(Math.random()*tetrominoes.length);
  let randomTet = tetrominoes[random];
  console.log(randomTet);
  draw();


});

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
