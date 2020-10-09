alert("If the page is to enlarged, zoom out to 67%")

var player1 = prompt("Player One: Enter your name, you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter your name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex,columnIndex,color){
  return table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,columnIndex){
  return table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color');
}

function checkBottom(columnIndex){
  var colorReport = returnColor(5,columnIndex);
  for (var row = 5; row >-1; row--) {
    colorReport = returnColor(row,columnIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }
}

function colorMatch(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

function horizontalWinCheck(){
  for (var row = 0; row < 6 ; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatch(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
        console.log("Horizontal Win");
        reportWin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if(colorMatch(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
        console.log("Vertical Win!");
        reportWin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++){
      if(colorMatch(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))){
        console.log("Diagnol Win!")
        reportWin(row,col);
        return true;
      }else if(colorMatch(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))){
        console.log("Diagnol Win!")
      }else{
        continue;
      }
    }
  }
}

function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}

//Starting Game

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+", it is your turn, pick a column to drop in!");


$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail,col,currentColor);

  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1;
  if(currentPlayer === 1){
    currentName = player1;
    $('h3').text(currentName+" it is your turn.");
    currentColor = player1Color;
  }else{
    currentName = player2;
    $('h3').text(currentName+" it is your turn.");
    currentColor = player2Color;
  }
})
