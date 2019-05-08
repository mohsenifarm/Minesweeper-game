//----------constant------------------
const pics = {
  zero: "images/0.png",
  one: "images/1.png",
  two: "images/2.png",
  three: "images/3.png",
  four: "images/4.png",
  five: "images/5.png",
  six: "images/6.png",
  seven: "images/7.png",
  eight: "images/8.png",
  bomb: "images/bomb2.jpg",
  flag: "images/flagged.png",
  empty: "images/facingDown.png"
};
//--------------variables------------------
var mineArr, img, btn, row, column, minesNum, flagArr;

//---------------dom--------------------
// var option = document.querySelector("select");
var sec = document.querySelector("section");
var resetBtn = document.querySelector("#refresh");
var h1 = document.querySelector("h1");
// var start = document.querySelector("#start");

//----------event & listener------------

sec.addEventListener("click", play);
sec.addEventListener("contextmenu", getFlag);
// start.addEventListener("click", startGame);
resetBtn.addEventListener("click", resrtGame);
// option.addEventListener("change", gameType);
//---------------function----------------
init();
function init() {
  flagArr = [];
  mineArr = [];
  row = 10;
  column = 10;

  minesNum = 10;
  render();
  img = document.querySelectorAll("img");
}
function render() {
  for (var i = 0; i < row * column; i++) {
    var cell = document.createElement("IMG");
    cell.id = i.toString();
    cell.setAttribute("src", "images/facingDown.png");
    sec.appendChild(cell);
  }
}
// function gameType(evt) {
  // console.log(evt.target[1].id);
  // if (evt.target[1].id) minesNum = 5; 
  // else if (evt.target[2].id) minesNum = 10; 
  // else if (evt.target[3].id) minesNum = 20; 
// } 
// gameType();


// function startGame(evt) {
//   minesNum = parseInt(inp);
//   // console.log(minesNum);
// }
// startGame();

function resrtGame(event) {
  event.target.id = location.reload();
}
function play(evt) {
  var eti = evt.target.id;
  var x = parseInt(eti) % row;
  var y = Math.floor(parseInt(eti) / column);
  if (mineArr.includes(parseInt(eti))) {
    mineArr.forEach(elm => {
      img[elm].src = `${pics.bomb}`;
      h1.innerHTML = `sorry you lose the game &#128546`;
      // setTimeout(function() {
      //   location.reload();
      // }, 2000);
    });
  } else {
    if (mineFinder(x, y) === 0) {
      reveal(x, y);
    } else {
      img[eti].src = `images/${mineFinder(x, y)}.png`;
    }
  }
}

function mineFinder(x, y) {
  var count = 0;
  if (isMine(x - 1, y)) count++;
  if (isMine(x + 1, y)) count++;
  if (isMine(x - 1, y - 1)) count++;
  if (isMine(x + 1, y - 1)) count++;
  if (isMine(x, y - 1)) count++;
  if (isMine(x - 1, y + 1)) count++;
  if (isMine(x + 1, y + 1)) count++;
  if (isMine(x, y + 1)) count++;
  return count;
}

function isMine(x, y) {
  if (
    mineArr.includes(y * row + x) &&
    row - 1 >= x &&
    x >= 0 &&
    column - 1 >= y &&
    y >= 0
  ) {
    return true;
  } else {
    return false;
  }
}

//random number array
function getRandom() {
  var i = 0;
  while (i < minesNum) {
    var num = Math.floor(Math.random() * 100);
    if (!mineArr.includes(num)) {
      mineArr.push(num);
      i++;
    }
  }
}

getRandom();
console.log(mineArr);

function checkImage(x, y) {
  if (img[y * row + x].attributes.src) {
    let source = img[y * row + x].attributes.src.nodeValue;
    if (x >= 0 && x < row && y >= 0 && y < column) {
      if (source === pics.empty) {
        return true;
      }
    } else return false;
  }
}
//put flag
function getFlag(event) {
  event.preventDefault();
  console.log(img[event.target.id].attributes.src.nodeValue);
  if (img[event.target.id].attributes.src.nodeValue === `${pics.empty}`) {
    img[event.target.id].src = `${pics.flag}`;
    flagArr.push(parseInt(event.target.id));
    // console.log(flagArr);
  } else if (img[event.target.id].attributes.src.nodeValue === `${pics.flag}`) {
    img[event.target.id].src = `${pics.empty}`;
  }
  getWinner();
}

function getWinner() {
  var a = mineArr.sort();
  var b = flagArr.sort();

  for (var i = 0; i < a.length; i++) {
    if (a[i] === b[i] && b.length === a.length) {
      h1.innerHTML = "YoU ArE A WiNnEr!!!!!!!!";
    }
  }
}

function reveal(x, y) {
  if (mineFinder(x, y) === 0) {
    img[y * row + x].src = `images/0.png`;
  }

  if (mineFinder(x - 1, y) === 0 && x > 0 && x < row && checkImage(x - 1, y))
    reveal(x - 1, y);
  else if (mineFinder(x - 1, y) !== 0 && x > 0 && x < row)
    img[y * row + x - 1].src = `images/${mineFinder(x - 1, y)}.png`;

  if (
    mineFinder(x + 1, y) === 0 &&
    x >= 0 &&
    x < row - 1 &&
    checkImage(x + 1, y)
  )
    reveal(x + 1, y);
  else if (mineFinder(x + 1, y) !== 0 && x >= 0 && x < row - 1)
    img[y * row + (x + 1)].src = `images/${mineFinder(x + 1, y)}.png`;

  if (mineFinder(x, y - 1) === 0 && y > 0 && y < column && checkImage(x, y - 1))
    reveal(x, y - 1);
  else if (mineFinder(x, y - 1) !== 0 && y > 0 && y < column)
    img[(y - 1) * row + x].src = `images/${mineFinder(x, y - 1)}.png`;

  if (
    mineFinder(x, y + 1) === 0 &&
    y >= 0 &&
    y < column - 1 &&
    checkImage(x, y + 1)
  )
    reveal(x, y + 1);
  else if (mineFinder(x, y + 1) !== 0 && y >= 0 && y < column - 1)
    img[(y + 1) * row + x].src = `images/${mineFinder(x, y + 1)}.png`;

  if (
    mineFinder(x - 1, y - 1) === 0 &&
    x > 0 &&
    x < row &&
    y > 0 &&
    checkImage(x - 1, y - 1)
  )
    reveal(x - 1, y - 1);
  else if (mineFinder(x - 1, y - 1) !== 0 && y > 0 && x > 0 && x < row)
    img[y * row + x - (row + 1)].src = `images/${mineFinder(x - 1, y - 1)}.png`;

  if (
    mineFinder(x + 1, y + 1) === 0 &&
    x >= 0 &&
    x < row - 1 &&
    y >= 0 &&
    y < column - 1 &&
    checkImage(x + 1, y + 1)
  )
    reveal(x + 1, y + 1);
  else if (
    mineFinder(x + 1, y + 1) !== 0 &&
    x >= 0 &&
    x < row - 1 &&
    y >= 0 &&
    y < column - 1
  )
    img[(y + 1) * row + (x + 1)].src = `images/${mineFinder(x + 1, y + 1)}.png`;

  if (
    mineFinder(x + 1, y - 1) === 0 &&
    x >= 0 &&
    x < row - 1 &&
    y > 0 &&
    y < column &&
    checkImage(x + 1, y - 1)
  )
    reveal(x + 1, y - 1);
  else if (
    mineFinder(x + 1, y - 1) !== 0 &&
    x >= 0 &&
    x < row - 1 &&
    y > 0 &&
    y < column
  ) {
    img[(y - 1) * row + (x + 1)].src = `images/${mineFinder(x + 1, y - 1)}.png`;
  }

  if (
    mineFinder(x - 1, y + 1) === 0 &&
    x > 0 &&
    x < row &&
    y >= 0 &&
    y < column - 1 &&
    checkImage(x - 1, y + 1)
  )
    reveal(x - 1, y + 1);
  else if (
    mineFinder(x - 1, y + 1) !== 0 &&
    x > 0 &&
    x < row &&
    y >= 0 &&
    y < column - 1
  ) {
    img[(y + 1) * row + (x - 1)].src = `images/${mineFinder(x - 1, y + 1)}.png`;
  }
}
