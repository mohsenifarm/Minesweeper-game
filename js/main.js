//----------constant------------------
const pics = {
  one: "images/1.png",
  two: "images/2.png",
  three: "images/3.png",
  four: "images/4.png",
  five: "images/5.png",
  six: "images/6.png",
  seven: "images/7.png",
  eight: "images/8.png",
  bomb: "images/bomb.png",
  flag: "images/flagged.png",
  empty: "images/flagged.png"
};
//--------------state------------------
var mineArr, img, btn;

//---------------dom--------------------
var sec = document.querySelector("section");
var resetBtn = document.querySelector("button");

//----------event & listener------------

sec.addEventListener("click", play);
//---------------function----------------
init();
function init() {
  mineArr = [];
  render();
  img = document.querySelectorAll("img");
}
function render() {
  for (var i = 0; i < 49; i++) {
    var cell = document.createElement("IMG");
    cell.id = i.toString();
    cell.setAttribute("src", "images/facingDown.png");
    sec.appendChild(cell);
  }
}
function play(evt) {
  var eti = evt.target.id;
  if (mineArr.includes(parseInt(eti))) {
    mineArr.forEach(elm => {
      img[elm].src = `${pics.bomb}`;
    });
  } else {
    mineFinder(eti);
  }
}

function mineFinder(eti) {
  console.log(eti);
  // var count = 0;
  // if (!mineArr.includes(parseInt(evt.target.id))) {
  //   if (mineArr.includes(img[parseInt(evt.target.id)] + 1)) {
  //     img[parseInt(evt.target.id)].src = `${pics.one}`;
  //   }
  // }
}

//random number array
function getRandom() {
  var i = 0;
  while (i < 10) {
    var num = Math.floor(Math.random() * 49);
    if (!mineArr.includes(num)) {
      mineArr.push(num);
      i++;
    }
  }
}
getRandom();
