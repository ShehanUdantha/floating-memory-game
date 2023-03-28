const boxes = document.querySelector(".screen-section");
const boxOne = document.getElementById("one");
const boxTwo = document.getElementById("two");
const boxThree = document.getElementById("three");
const boxFour = document.getElementById("four");
const boxFive = document.getElementById("five");
const boxSix = document.getElementById("six");
const boxValue = document.querySelectorAll(".box-value");

const start = document.getElementById("start");
const reStart = document.getElementById("restart");
const end = document.getElementById("end");

const viewTime = document.getElementById("view");
const remainTime = document.getElementById("remain");

const viewClass = document.querySelector(".viewTime");
const remainClass = document.querySelector(".remainTime");

const modal = document.querySelector(".modal-section");
const guidance = document.querySelector(".guidance");
const close = document.querySelector(".icon");
const result = document.querySelector(".result");
const list = document.querySelector(".ordered-list");

// set default colors
const primaryColor = "#ffe4c4";
const secondaryColor = "#c9b49a";

//default positions
const oneX = boxOne.offsetLeft;
const oneY = boxOne.offsetTop;

const twoX = boxTwo.offsetLeft;
const twoY = boxTwo.offsetTop;

const threeX = boxThree.offsetLeft;
const threeY = boxThree.offsetTop;

const fourX = boxFour.offsetLeft;
const fourY = boxFour.offsetTop;

const fiveX = boxFive.offsetLeft;
const fiveY = boxFive.offsetTop;

const sixX = boxSix.offsetLeft;
const sixY = boxSix.offsetTop;

// moving box 10px speed
let speedOneX = 10;
let speedOneY = 10;

let speedTwoX = 10;
let speedTwoY = 10;

let speedThreeX = 10;
let speedThreeY = 10;

let speedFourX = 10;
let speedFourY = 10;

let speedFiveX = 10;
let speedFiveY = 10;

let speedSixX = 10;
let speedSixY = 10;

// get screen element width and height
let boxesWidth = boxes.clientWidth;
let boxesHeight = boxes.clientHeight;

// const resize_ob = new ResizeObserver(function (entries) {
//   // since we are observing only a single element, so we access the first element in entries array
//   let rect = entries[0].contentRect;

//   // current width & height
//   boxesWidth = rect.width;
//   boxesHeight = rect.height;
// });

// start observing for resize
// resize_ob.observe(boxes);
//console.log("w" + " " + boxesWidth, "h" + " " + boxesHeight);

// get updated position
let positionOneX = oneX;
let positionOneY = oneY;

let positionTwoX = twoX;
let positionTwoY = twoY;

let positionThreeX = threeX;
let positionThreeY = threeY;

let positionFourX = fourX;
let positionFourY = fourY;

let positionFiveX = fiveX;
let positionFiveY = fiveY;

let positionSixX = sixX;
let positionSixY = sixY;

// create default times
const defaultViewTime = 15;
const defaultRemainTime = 60;

//  set default times
setDefaultTimes();

// set default time to counters
let countViewTime = defaultViewTime;
let countRemainTime = defaultRemainTime;

let mover;
let remainTimer;
let viewTimer;
let boxArray = [];
let isTrue = false;

guidance.addEventListener("click", () => {
  modal.style.display = "flex";
  list.style.display = "block";
  result.style.display = "none";
});

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

// box click events
boxOne.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    // console.log(boxOne.children[0].innerHTML);
    addValues(boxOne.children[0].innerHTML);
    boxOne.style.backgroundColor = secondaryColor;
    boxOne.style.pointerEvents = "none";
  }
});

boxTwo.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    // console.log(boxTwo.children[0].innerHTML);
    addValues(boxTwo.children[0].innerHTML);
    boxTwo.style.backgroundColor = secondaryColor;
    boxTwo.style.pointerEvents = "none";
  }
});

boxThree.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    // console.log(boxThree.children[0].innerHTML);
    addValues(boxThree.children[0].innerHTML);
    boxThree.style.backgroundColor = secondaryColor;
    boxThree.style.pointerEvents = "none";
  }
});

boxFour.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    // console.log(boxFour.children[0].innerHTML);
    addValues(boxFour.children[0].innerHTML);
    boxFour.style.backgroundColor = secondaryColor;
    boxFour.style.pointerEvents = "none";
  }
});

boxFive.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    // console.log(boxFive.children[0].innerHTML);
    addValues(boxFive.children[0].innerHTML);
    boxFive.style.backgroundColor = secondaryColor;
    boxFive.style.pointerEvents = "none";
  }
});

boxSix.addEventListener("click", (e) => {
  e.preventDefault();
  if (isTrue) {
    // console.log(boxSix.children[0].innerHTML);
    addValues(boxSix.children[0].innerHTML);
    boxSix.style.backgroundColor = secondaryColor;
    boxSix.style.pointerEvents = "none";
  }
});

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

function displayBoxValues(displayType) {
  for (let i = 0; i < boxValue.length; i++) {
    boxValue[i].style.display = `${displayType === "hide" ? "none" : "block"}`;
  }
}

function setViewTimer() {
  viewTimer = setInterval(() => {
    if (countViewTime <= defaultViewTime && countViewTime >= 0) {
      viewTime.innerHTML = countViewTime--;
    } else {
      viewClass.style.display = "none";
      remainClass.style.display = "flex";
      setRemainTimer();
      displayBoxValues("hide");
      clearInterval(viewTimer);
    }
  }, 1000);
}

function taskRemover() {
  clearInterval(remainTimer);
  clearInterval(mover);
  displayBoxValues("block");
  isTrue = false;
}

function setResult(result) {
  modal.style.display = "flex";
  result.style.display = "flex";
  list.style.display = "none";
  result.innerHTML = result;
}

function setRemainTimer() {
  remainTimer = setInterval(() => {
    if (countRemainTime <= defaultRemainTime && countRemainTime >= 0) {
      remainTime.innerHTML = countRemainTime--;
      isTrue = true;
    } else {
      taskRemover();
      setResult("You lose!");
      setToDefault();
    }
  }, 1000);
}

function addValues(value) {
  boxArray.push(value);
  console.log(boxArray);

  if (boxArray.length === 6) {
    taskRemover();

    if (boxArray.join("") === "123456") {
      // console.log("you win!");
      setResult("You win!");
    } else {
      // console.log("you lose!");
      setResult("You lose!");
    }

    setTimeout(() => {
      setToDefault();
    }, 5000);
  }
  console.log(value);
}

function setBackgroundColorForAllBoxes(color) {
  boxOne.style.backgroundColor = color;
  boxTwo.style.backgroundColor = color;
  boxThree.style.backgroundColor = color;
  boxFour.style.backgroundColor = color;
  boxFive.style.backgroundColor = color;
  boxSix.style.backgroundColor = color;
}

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

  positionOneX = oneX;
  positionOneY = oneY;

  positionTwoX = twoX;
  positionTwoY = twoY;

  positionThreeX = threeX;
  positionThreeY = threeY;

  positionFourX = fourX;
  positionFourY = fourY;

  positionFiveX = fiveX;
  positionFiveY = fiveY;

  positionSixX = sixX;
  positionSixY = sixY;

  positionBoxes();
}

function setDefaultTimes() {
  viewTime.textContent = defaultViewTime;
  remainTime.textContent = defaultRemainTime;
}

function positionBoxes() {
  boxOne.style.left = `${positionOneX}px`;
  boxOne.style.top = `${positionOneY}px`;

  boxTwo.style.left = `${positionTwoX}px`;
  boxTwo.style.top = `${positionTwoY}px`;

  boxThree.style.left = `${positionThreeX}px`;
  boxThree.style.top = `${positionThreeY}px`;

  boxFour.style.left = `${positionFourX}px`;
  boxFour.style.top = `${positionFourY}px`;

  boxFive.style.left = `${positionFiveX}px`;
  boxFive.style.top = `${positionFiveY}px`;

  boxSix.style.left = `${positionSixX}px`;
  boxSix.style.top = `${positionSixY}px`;
}

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

    positionBoxes();

    // console.log(boxesWidth, positionOneX);
    // console.log(boxesHeight, positionOneY);

    // fix position overflow
    if (positionOneX <= 5 || positionOneX >= boxesWidth - 70) {
      speedOneX *= -1;
    }
    if (positionOneY <= 5 || positionOneY >= boxesHeight - 70) {
      speedOneY *= -1;
    }

    if (positionTwoX <= 5 || positionTwoX >= boxesWidth - 70) {
      speedTwoX *= -1;
    }
    if (positionTwoY <= 5 || positionTwoY >= boxesHeight - 70) {
      speedTwoY *= -1;
    }

    if (positionThreeX <= 5 || positionThreeX >= boxesWidth - 70) {
      speedThreeX *= -1;
    }
    if (positionThreeY <= 5 || positionThreeY >= boxesHeight - 70) {
      speedThreeY *= -1;
    }

    if (positionFourX <= 5 || positionFourX >= boxesWidth - 70) {
      speedFourX *= -1;
    }
    if (positionFourY <= 5 || positionFourY >= boxesHeight - 70) {
      speedFourY *= -1;
    }

    if (positionFiveX <= 5 || positionFiveX >= boxesWidth - 70) {
      speedFiveX *= -1;
    }
    if (positionFiveY <= 5 || positionFiveY >= boxesHeight - 70) {
      speedFiveY *= -1;
    }

    if (positionSixX <= 5 || positionSixX >= boxesWidth - 70) {
      speedSixX *= -1;
    }
    if (positionSixY <= 5 || positionSixY >= boxesHeight - 70) {
      speedSixY *= -1;
    }
  }, 200);
}
