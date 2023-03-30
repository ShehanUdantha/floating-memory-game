const header = document.querySelector(".header-section");
const boxes = document.querySelector(".screen-section");

const start = document.getElementById("start");
const reStart = document.getElementById("restart");
const end = document.getElementById("end");

const viewTime = document.getElementById("view");
const remainTime = document.getElementById("remain");

const viewClass = document.querySelector(".viewTime");
const remainClass = document.querySelector(".remainTime");

const modal = document.querySelector(".modal-section");
const close = document.querySelector(".icon");
const result = document.querySelector(".result");

// set default colors
const primaryColor = "#ffe4c4";
const secondaryColor = "#c9b49a";
const winColor = "#ffc107";
const loseColor = "#dc3545";

// get screen element width and height
const boxesDefaultWidth = boxes.clientWidth;
const boxesDefaultHeight = boxes.clientHeight;
// console.log(boxesDefaultWidth, boxesDefaultHeight);

let boxesWidth = boxesDefaultWidth;
let boxesHeight = boxesDefaultHeight;
// console.log(boxesWidth, boxesHeight);

let boxOne;
let boxTwo;
let boxThree;
let boxFour;
let boxFive;
let boxSix;
let boxValue;

//draw boxes
function drawBox() {
  boxes.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    // create a box
    const box = document.createElement("div");
    box.classList.add("box");
    box.id = i + 1;

    // assign a number to the box
    const span = document.createElement("span");
    span.classList.add("box-value");
    span.innerHTML = i + 1;

    box.appendChild(span);

    // set random position for box
    let positionX = Math.floor(Math.random() * (boxesWidth / 1.5));
    let positionY = Math.floor(Math.random() * (boxesHeight / 1.5));

    // avoid the box stuck on wall when the game starting time
    box.style.left =
      positionX > 20
        ? positionX < boxesWidth - 20
          ? positionX + "px"
          : positionX + 20 + "px"
        : positionX + 20 + "px";

    box.style.bottom =
      positionY > 20
        ? positionY < boxesHeight - 20
          ? positionY + "px"
          : positionY + 20 + "px"
        : positionY + 20 + "px";

    // add into a screen
    boxes.appendChild(box);
  }
  boxOne = document.getElementById("1");
  boxTwo = document.getElementById("2");
  boxThree = document.getElementById("3");
  boxFour = document.getElementById("4");
  boxFive = document.getElementById("5");
  boxSix = document.getElementById("6");
  boxValue = document.querySelectorAll(".box-value");

  // console.log(
  //   boxOne.offsetLeft,
  //   boxOne.offsetTop,
  //   boxTwo.offsetLeft,
  //   boxTwo.offsetTop,
  //   boxThree.offsetLeft,
  //   boxThree.offsetTop,

  //   boxFour.offsetLeft,
  //   boxFour.offsetTop,
  //   boxFive.offsetLeft,
  //   boxFive.offsetTop,
  //   boxSix.offsetTop,
  //   boxSix.offsetLeft
  // );
}
drawBox();

// declare a positions variable
let positionOneX;
let positionOneY;

let positionTwoX;
let positionTwoY;

let positionThreeX;
let positionThreeY;

let positionFourX;
let positionFourY;

let positionFiveX;
let positionFiveY;

let positionSixX;
let positionSixY;

// update positions
function updateThePositions() {
  positionOneX = boxOne.offsetLeft;
  positionOneY = boxOne.offsetTop;

  positionTwoX = boxTwo.offsetLeft;
  positionTwoY = boxTwo.offsetTop;

  positionThreeX = boxThree.offsetLeft;
  positionThreeY = boxThree.offsetTop;

  positionFourX = boxFour.offsetLeft;
  positionFourY = boxFour.offsetTop;

  positionFiveX = boxFive.offsetLeft;
  positionFiveY = boxFive.offsetTop;

  positionSixX = boxSix.offsetLeft;
  positionSixY = boxSix.offsetTop;
}

updateThePositions();

// box moving length
let speedOneX = 10;
let speedOneY = 10;

let speedTwoX = 11;
let speedTwoY = 11;

let speedThreeX = 12;
let speedThreeY = 12;

let speedFourX = 13;
let speedFourY = 13;

let speedFiveX = 14;
let speedFiveY = 14;

let speedSixX = 15;
let speedSixY = 15;

// create default times
const defaultViewTime = 15;
const defaultRemainTime = 60;

// set default times
function setDefaultTimes() {
  viewTime.textContent = defaultViewTime;
  remainTime.textContent = defaultRemainTime;
}

setDefaultTimes();

// set default time to counters
let countViewTime = defaultViewTime;
let countRemainTime = defaultRemainTime;

let mover;
let remainTimer;
let viewTimer;
let boxArray = [];
let isTrue = false;

// button to close modal
close.addEventListener("click", () => {
  modal.style.display = "none";
});

// display specific button
setStylesForButtons("before");

// start button click
start.addEventListener("click", () => {
  startGame();
});

// restart button click
reStart.addEventListener("click", () => {
  setToDefault();
  setTimeout(() => {
    startGame();
  }, 1000);
});

// end button click
end.addEventListener("click", () => {
  setToDefault();
});

// display or hidden buttons specific time
function setStylesForButtons(period) {
  if (period == "before") {
    start.style.display = "block";
    reStart.style.display = "none";
    end.style.display = "none";
  } else if (period == "after") {
    start.style.display = "none";
    reStart.style.display = "block";
    end.style.display = "block";
  }
}

// display or hidden box numbers
function displayBoxValues(displayType) {
  for (let i = 0; i < boxValue.length; i++) {
    boxValue[i].style.display = `${displayType === "hide" ? "none" : "block"}`;
  }
}

// count viewing time
function setViewTimer() {
  viewTimer = setInterval(() => {
    if (countViewTime <= defaultViewTime && countViewTime >= 0) {
      viewTime.innerHTML = countViewTime--;
      isView = true;
    } else {
      viewClass.style.display = "none";
      remainClass.style.display = "flex";
      setRemainTimer();
      displayBoxValues("hide");
      clearInterval(viewTimer);
    }
  }, 1000);
}

// box click events
boxOne.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    addValues(boxOne.children[0].innerHTML);
    boxOne.style.backgroundColor = secondaryColor;
    boxOne.style.pointerEvents = "none";
  }
});

boxTwo.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    addValues(boxTwo.children[0].innerHTML);
    boxTwo.style.backgroundColor = secondaryColor;
    boxTwo.style.pointerEvents = "none";
  }
});

boxThree.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    addValues(boxThree.children[0].innerHTML);
    boxThree.style.backgroundColor = secondaryColor;
    boxThree.style.pointerEvents = "none";
  }
});

boxFour.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    addValues(boxFour.children[0].innerHTML);
    boxFour.style.backgroundColor = secondaryColor;
    boxFour.style.pointerEvents = "none";
  }
});

boxFive.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    addValues(boxFive.children[0].innerHTML);
    boxFive.style.backgroundColor = secondaryColor;
    boxFive.style.pointerEvents = "none";
  }
});

boxSix.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    addValues(boxSix.children[0].innerHTML);
    boxSix.style.backgroundColor = secondaryColor;
    boxSix.style.pointerEvents = "none";
  }
});

function taskRemover() {
  clearInterval(remainTimer);
  clearInterval(mover);
  displayBoxValues("block");
  isTrue = false;
}

// display result
function setResult(value, color) {
  modal.style.display = "flex";
  result.innerHTML = value;
  result.style.color = color;
  // console.log(value);
}

// count remaining time
function setRemainTimer() {
  remainTimer = setInterval(() => {
    if (countRemainTime <= defaultRemainTime && countRemainTime >= 0) {
      remainTime.innerHTML = countRemainTime--;
      isTrue = true;
    } else {
      taskRemover();
      setResult("You lose!", loseColor);
      setToDefault();
    }
  }, 1000);
}

// check game win or lose
function addValues(value) {
  boxArray.push(value);
  // console.log(boxArray.toString());

  if (boxArray.length === 6) {
    taskRemover();

    if (boxArray.join("") === "123456") {
      setResult("You win!", winColor);
    } else {
      setResult("You lose!", loseColor);
    }

    setTimeout(() => {
      setToDefault();
    }, 5000);
  }
}

function setBackgroundColorForAllBoxes(color) {
  boxOne.style.backgroundColor = color;
  boxTwo.style.backgroundColor = color;
  boxThree.style.backgroundColor = color;
  boxFour.style.backgroundColor = color;
  boxFive.style.backgroundColor = color;
  boxSix.style.backgroundColor = color;
}

// set all values to default
function setToDefault() {
  setStylesForButtons("before");
  setDefaultTimes();
  setBackgroundColorForAllBoxes(primaryColor);
  clearInterval(viewTimer);
  viewClass.style.display = "flex";
  remainClass.style.display = "none";
  taskRemover();

  countViewTime = defaultViewTime;
  countRemainTime = defaultRemainTime;
  drawBox();
  updateThePositions();
}

// start the game
function startGame() {
  setStylesForButtons("after");
  setViewTimer();

  mover = setInterval(() => {
    // increase the positions
    positionOneX += speedOneX;
    positionOneY += speedOneY;

    positionTwoX += speedTwoX;
    positionTwoY += speedTwoY;

    positionThreeX += speedThreeX;
    positionThreeY += speedThreeY;

    positionFourX += speedFourX;
    positionFourY += speedFourY;

    positionFiveX += speedFiveX;
    positionFiveY += speedFiveY;

    positionSixX += speedSixX;
    positionSixY += speedSixY;

    // add positions to boxes
    boxOne.style.left = `${positionOneX}px`;
    boxOne.style.bottom = `${positionOneY}px`;

    boxTwo.style.left = `${positionTwoX}px`;
    boxTwo.style.top = `${positionTwoY}px`;

    boxThree.style.left = `${positionThreeX}px`;
    boxThree.style.bottom = `${positionThreeY}px`;

    boxFour.style.left = `${positionFourX}px`;
    boxFour.style.top = `${positionFourY}px`;

    boxFive.style.left = `${positionFiveX}px`;
    boxFive.style.bottom = `${positionFiveY}px`;

    boxSix.style.left = `${positionSixX}px`;
    boxSix.style.top = `${positionSixY}px`;

    // console.log("w" + " " + boxesWidth, "h" + " " + boxesHeight);

    // fixed position overflow
    if (
      positionOneX <= 5 ||
      positionOneX >= boxesWidth - (boxOne.clientWidth + 8)
    ) {
      speedOneX *= -1;
    }
    if (
      positionOneY <= 5 ||
      positionOneY >= boxesHeight - (boxOne.clientHeight + 4)
    ) {
      speedOneY *= -1;
    }

    if (
      positionTwoX <= 5 ||
      positionTwoX >= boxesWidth - (boxTwo.clientWidth + 5)
    ) {
      speedTwoX *= -1;
    }
    if (
      positionTwoY <= 5 ||
      positionTwoY >= boxesHeight - (boxTwo.clientHeight + 5)
    ) {
      speedTwoY *= -1;
    }

    if (
      positionThreeX <= 5 ||
      positionThreeX >= boxesWidth - (boxThree.clientWidth + 8)
    ) {
      speedThreeX *= -1;
    }
    if (
      positionThreeY <= 5 ||
      positionThreeY >= boxesHeight - (boxThree.clientHeight + 8)
    ) {
      speedThreeY *= -1;
    }

    if (
      positionFourX <= 5 ||
      positionFourX >= boxesWidth - (boxFour.clientWidth + 5)
    ) {
      speedFourX *= -1;
    }
    if (
      positionFourY <= 5 ||
      positionFourY >= boxesHeight - (boxFour.clientHeight + 8)
    ) {
      speedFourY *= -1;
    }

    if (
      positionFiveX <= 6 ||
      positionFiveX >= boxesWidth - (boxFive.clientWidth + 13)
    ) {
      speedFiveX *= -1;
    }
    if (
      positionFiveY <= 5 ||
      positionFiveY >= boxesHeight - (boxFive.clientHeight + 8)
    ) {
      speedFiveY *= -1;
    }

    if (
      positionSixX <= 5 ||
      positionSixX >= boxesWidth - (boxSix.clientWidth + 10)
    ) {
      speedSixX *= -1;
    }
    if (
      positionSixY <= 5 ||
      positionSixY >= boxesHeight - (boxSix.clientHeight + 10)
    ) {
      speedSixY *= -1;
    }
  }, 200);
}
