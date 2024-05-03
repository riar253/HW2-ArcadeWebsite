"use strict";

// boards
const easyBoard = [
  [1, 0, 0, 4, 8, 9, 0, 0, 6],
  [7, 3, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 1, 2, 9, 5],
  [0, 0, 7, 1, 2, 0, 6, 0, 0],
  [5, 0, 0, 7, 0, 3, 0, 0, 8],
  [0, 0, 6, 0, 9, 5, 7, 0, 0],
  [9, 1, 4, 6, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 3, 7],
  [8, 0, 0, 5, 1, 2, 0, 0, 4],
];
const mediumBoard = [
  [0, 2, 0, 6, 0, 8, 0, 0, 0],
  [5, 8, 0, 0, 0, 9, 7, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0],
  [3, 7, 0, 0, 0, 0, 5, 0, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 8, 0, 0, 0, 0, 1, 3],
  [0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 9, 8, 0, 0, 0, 3, 6],
  [0, 0, 0, 3, 0, 6, 0, 9, 0],
];
const hardBoard = [
  [0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 0, 3],
  [0, 7, 4, 0, 8, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 2],
  [0, 8, 0, 0, 4, 0, 0, 1, 0],
  [6, 0, 0, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 7, 8, 0],
  [5, 0, 0, 0, 0, 9, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 4, 0],
];

// solutions
const easySolution = [
  [1, 5, 2, 4, 8, 9, 3, 7, 6],
  [7, 3, 9, 2, 5, 6, 8, 4, 1],
  [4, 6, 8, 3, 7, 1, 2, 9, 5],
  [3, 8, 7, 1, 2, 4, 6, 5, 9],
  [5, 9, 1, 7, 6, 3, 4, 2, 8],
  [2, 4, 6, 8, 9, 5, 7, 1, 3],
  [9, 1, 4, 6, 3, 7, 5, 8, 2],
  [6, 2, 5, 9, 4, 8, 1, 3, 7],
  [8, 7, 3, 5, 1, 2, 9, 6, 4],
];
const mediumSolution = [
  [1, 2, 3, 6, 7, 8, 9, 4, 5],
  [5, 8, 4, 2, 3, 9, 7, 6, 1],
  [9, 6, 7, 1, 4, 5, 3, 2, 8],
  [3, 7, 2, 4, 6, 1, 5, 8, 9],
  [6, 9, 1, 5, 8, 3, 2, 7, 4],
  [4, 5, 8, 7, 9, 2, 6, 1, 3],
  [8, 3, 6, 9, 2, 4, 1, 5, 7],
  [2, 1, 9, 8, 5, 7, 4, 3, 6],
  [7, 4, 5, 3, 1, 6, 8, 9, 2],
];
const hardSolution = [
  [1, 2, 6, 4, 3, 7, 9, 5, 8],
  [8, 9, 5, 6, 2, 1, 4, 7, 3],
  [3, 7, 4, 9, 8, 5, 1, 2, 6],
  [4, 5, 7, 1, 9, 3, 8, 6, 2],
  [9, 8, 3, 2, 4, 6, 5, 1, 7],
  [6, 1, 2, 5, 7, 8, 3, 9, 4],
  [2, 6, 9, 3, 1, 4, 7, 8, 5],
  [5, 4, 8, 7, 6, 9, 2, 3, 1],
  [7, 3, 1, 8, 5, 2, 6, 4, 9],
];

const sudokuNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const inputs = document.querySelectorAll("input");
const cells = document.querySelectorAll(".cell");
const modesBtn = document.querySelectorAll(".modes button");
const modes = document.querySelector(".modes");
let isValid = false;

// Initialize / setup game - Default
function init() {
  for (let i = 3; i <= cells.length; i = i + 3) {
    if (i % 9 !== 0) {
      document.getElementById(`cell-${i}`).classList.add("middle-border");
    }
  }
  for (let i = 19; i <= 54; i++) {
    if (i === 28) i = 46;
    document.getElementById(`cell-${i}`).classList.add("middle-bottom-border");
  }
  setupBoard(easyBoard);
  isValid = false;
}

init();

// setupboard according to the difficulty level/mode
function setupBoard(board) {
  clearErrors();
  isValid = false;
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      const cellIdx = i * 9 + j + 1;
      const el = document.querySelector(`#cell-${cellIdx} input`);
      el.value = "";
      el.disabled = false;
      el.classList.remove("fixedinput");
      el.classList.remove("solved");
      if (board[i][j] !== 0) {
        el.value = board[i][j];
        el.classList.add("fixedinput");
        el.disabled = true;
      }
    });
  });
}

// select easy,medium,hard
modes.addEventListener("click", function (event) {
  isValid = false;
  document.getElementById("validate-btn").disabled = false;
  document.getElementById("validate-btn").classList.remove("disable-validate");

  const btnClicked = event.target;
  modesBtn.forEach((el) => {
    clearErrors();
    if (!btnClicked.className.startsWith("modes"))
      el.classList.remove("mode-active");
  });
  btnClicked.classList.add("mode-active");
  switch (btnClicked.innerText) {
    case "Easy":
      setupBoard(easyBoard);
      break;
    case "Medium":
      setupBoard(mediumBoard);
      break;
    case "Hard":
      setupBoard(hardBoard);
      break;
  }
});

// duplicacy check for each row
function duplicateRow(rowNumber) {
  const values = [];
  const start = (rowNumber - 1) * 9 + 1;
  const end = rowNumber * 9;
  for (let i = start; i <= end; i++) {
    const v = +document.querySelector(`#cell-${i} input`).value;
    if (v !== "") values.push(v);
  }
  values.forEach((el, idx) => {
    if (el !== 0)
      if (values.indexOf(el) !== idx) {
        document
          .querySelector(`#cell-${values.indexOf(el) + start} input`)
          .classList.add("cell-error");
        document
          .querySelector(`#cell-${idx + start} input`)
          .classList.add("cell-error");
      }
  });
}
// duplicacy chcek for each column
function dupliacteColumn(columnNumber) {
  const values = [];
  const start = columnNumber;
  const end = columnNumber + 72;

  for (let i = start; i <= end; i = i + 9) {
    const v = +document.querySelector(`#cell-${i} input`).value;
    if (v !== "") values.push(v);
  }

  values.forEach((el, idx) => {
    if (el !== 0)
      if (values.indexOf(el) !== idx) {
        document
          .querySelector(`#cell-${9 * values.indexOf(el) + start} input`)
          .classList.add("cell-error");
        document
          .querySelector(`#cell-${9 * idx + start} input`)
          .classList.add("cell-error");
      }
  });
}
// duplicacy check for each block
function duplicateBlock(blockNumber) {
  const values = [];
  let start;
  switch (blockNumber) {
    case 1:
      start = blockNumber;
      break;
    case 2:
      start = 4;
      break;
    case 3:
      start = 7;
      break;
    case 4:
      start = 28;
      break;
    case 5:
      start = 31;
      break;
    case 6:
      start = 34;
      break;
    case 7:
      start = 55;
      break;
    case 8:
      start = 58;
      break;
    case 9:
      start = 61;
  }
  const end = start + 20;

  for (let i = start; i <= end; i++) {
    // selecting / getting each cell's value in each row-i
    const v = +document.querySelector(`#cell-${i} input`).value;
    if (v !== "") values.push(v);
    if (i % 3 === 0) i += 6;
  }

  values.forEach((el, idx) => {
    if (el !== 0)
      if (values.indexOf(el) !== idx) {
        console.log(idx);
        let num;
        const c = values.indexOf(el);
        num = c + 1 > 3 && c + 1 <= 6 ? c + 6 : c + 1 > 6 ? c + 12 : c;
        // console.log(el, idx, `#cell-${num + start}`);
        document
          .querySelector(`#cell-${num + start} input`)
          .classList.add("cell-error");
        num =
          idx + 1 > 3 && idx + 1 <= 6 ? idx + 6 : idx + 1 > 6 ? idx + 12 : idx;
        document
          .querySelector(`#cell-${num + start} input`)
          .classList.add("cell-error");
      }
  });
}
// duplicacy check for all 9 rows
function duplicateRows() {
  for (let i = 1; i <= 9; i++) {
    duplicateRow(i);
  }
  return true;
}
// duplicacy check for all 9 columns
function duplicateColumns() {
  for (let i = 1; i <= 9; i++) {
    dupliacteColumn(i);
  }
  return true;
}
// duplicacy check for all 9 blocks
function duplicateBlocks() {
  for (let i = 1; i <= 9; i++) {
    duplicateBlock(i);
  }
  return true;
}
// duplicacy check on the entire sudoku
function duplicate() {
  const isDuplicate =
    duplicateRows() && duplicateColumns() && duplicateBlocks();
}

// function to check if arrays are equal
function arrEqual(a, b) {
  if (a.length == b.length) {
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}

// validating the each row
function validateRow(rowNumber) {
  const values = []; //array to contain cell elements

  // row1 first cell is cell-1
  // row2 first cell is cell-10
  const start = (rowNumber - 1) * 9 + 1;

  // row1 last cell is cell-9
  // row2 last cell is cell-18
  const end = rowNumber * 9;
  let sum = 0;
  let flag;
  for (let i = start; i <= end; i++) {
    // selecting / getting each cell's value in each row-i
    const v = +document.querySelector(`#cell-${i} input`).value;
    // pushing non empty cell elements in the values array
    if (v === "") {
      values.push(0);
    } else {
      values.push(v);
      sum = sum + v;
    }
  }
  // each row sum should be 45
  if (sum == 45) {
    flag = 1;
  }
  values.sort();
  // each row should have no. 1 to 9 and no duplicates
  if (arrEqual(values, sudokuNum)) {
    flag++;
  }

  // values.forEach((el, idx) => {
  //   if (el !== 0)
  //     if (values.indexOf(el) !== idx) {
  //       document
  //         .querySelector(`#cell-${values.indexOf(el) + start} input`)
  //         .classList.add("cell-error");
  //       document
  //         .querySelector(`#cell-${idx + start} input`)
  //         .classList.add("cell-error");
  //     }
  // });

  if (flag == 2) return true;
}
// validating the each column
function validateColumn(columnNumber) {
  const values = []; //array to contain cell elements
  let sum = 0;
  let flag;
  // row1 first cell is cell-1
  // row2 first cell is cell-10
  const start = columnNumber;

  // row1 last cell is cell-9
  // row2 last cell is cell-18
  const end = columnNumber + 72;

  for (let i = start; i <= end; i = i + 9) {
    // selecting / getting each cell's value in each row-i
    const v = +document.querySelector(`#cell-${i} input`).value;
    // pushing non empty cell elements in the values array
    if (v === "") {
      values.push(0);
    } else {
      values.push(v);
      sum = sum + v;
    }
  }

  if (sum == 45) {
    flag = 1;
  }
  values.sort();
  if (arrEqual(values, sudokuNum)) {
    flag++;
  }

  if (flag == 2) return true;
}
// validating each block
function validateBlock(blockNumber) {
  const values = []; //array to contain cell elements
  let sum = 0;
  let flag;
  let start;
  switch (blockNumber) {
    case 1:
      start = blockNumber;
      break;
    case 2:
      start = 4;
      break;
    case 3:
      start = 7;
      break;
    case 4:
      start = 28;
      break;
    case 5:
      start = 31;
      break;
    case 6:
      start = 34;
      break;
    case 7:
      start = 55;
      break;
    case 8:
      start = 58;
      break;
    case 9:
      start = 61;
  }

  const end = start + 20;

  // console.log(start, end);

  for (let i = start; i <= end; i++) {
    console.log("block", i);
    // selecting / getting each cell's value in each row-i
    const v = +document.querySelector(`#cell-${i} input`).value;
    // pushing non empty cell elements in the values array
    if (v === "") {
      values.push(0);
    } else {
      values.push(v);
      sum = sum + v;
    }
    if (i % 3 === 0) i += 6;
  }

  if (sum == 45) {
    flag = 1;
  }
  values.sort();
  if (arrEqual(values, sudokuNum)) {
    flag++;
  }

  if (flag == 2) return true;
}

// validating all the 9 rows
function validateRows() {
  let c = 0;
  for (let i = 1; i <= 9; i++) {
    //further calling this function for each row no.
    if (validateRow(i)) {
      c++;
    }
  }
  if (c == 9) return true;
}
// validating all the 9 columns
function validateColumns() {
  let c = 0;
  for (let i = 1; i <= 9; i++) {
    //further calling this function for each column no.
    if (validateColumn(i)) {
      c++;
    }
  }
  if (c == 9) return true;
}
// validating all the 9 blocks
function validateBlocks() {
  let c = 0;
  for (let i = 1; i <= 9; i++) {
    //further calling this function for each block no.
    if (validateBlock(i)) {
      c++;
    }
  }
  if (c == 9) return true;
}

// validating the entire sudoku by checking rows, columns and blocks.
function validateSudoku() {
  isValid = validateRows() && validateColumns() && validateBlocks(); // calling these 3 functions

  // checking if any cell is empty/ or incomplete game/failure
  for (let i = 1; i <= 81; i++) {
    // console.log(document.querySelector(`#cell-${i} input`).value);
    if (document.querySelector(`#cell-${i} input`).value == "") {
      var modal2 = document.getElementById("myModal2");

      // Get the button that opens the modal
      var btn2 = document.getElementById("validate-btn");

      // Get the <span> element that closes the modal
      var span2 = document.getElementsByClassName("close2")[0];

      // When the user clicks on the button, open the modal
      btn2.onclick = function () {
        modal2.style.display = "block";
      };

      // When the user clicks on <span> (x), close the modal
      span2.onclick = function () {
        modal2.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal2.style.display = "none";
        }
      };
      break;
    }
  }
  // if the sudoku is valid/ Success
  if (isValid) {
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("validate-btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    isValid = false;
  }
}

// calling the sudoku validation button on the click of button validate
document
  .getElementById("validate-btn")
  .addEventListener("click", validateSudoku);

// removing all cell errors
function clearErrors() {
  for (let i = 1; i <= 81; i++) {
    document.querySelector(`#cell-${i} input`).classList.remove("cell-error");
  }
}
// for each input element of the cell.......
inputs.forEach((el) => {
  el.addEventListener("keypress", (event) => {
    const ASCIICode = event.which ? event.which : event.keyCode;
    // validating only numbers allowed in each input
    if (ASCIICode > 31 && (ASCIICode < 49 || ASCIICode > 57))
      event.preventDefault();
    clearErrors();
    duplicate();
  });

  el.addEventListener("mouseout", (event) => {
    duplicate();
  });
});

//function to manage highlights
function highlight(evt, handler) {
  const numClicked = evt.target.value;
  if (numClicked)
    for (let i = 1; i <= 81; i++) {
      const element = document.querySelector(`#cell-${i} input`);
      if (element.value === numClicked) {
        if (handler === "addhigh") {
          element.classList.add("highlight");
        } else if (handler === "removehigh") {
          setTimeout(function () {
            element.classList.remove("highlight");
          }, 2000);
        }
      }
    }
}

// for each cell.......
cells.forEach((el) => {
  // adding highlights to the same no.s in board on doubleclick
  el.addEventListener("dblclick", (event) => {
    highlight(event, "addhigh");
    highlightRowCol(event);
  });

  // removing highlights 2sec later moving away from the mouse
  el.addEventListener("mouseout", (event) => {
    highlight(event, "removehigh");
  });
});

// highlight the entire row n column of the cell selected
function highlightRowCol(evt) {
  const clickedCellId = evt.target.parentElement.id.split("-")[1];
  // console.log(clickedCellId);
  const startRow = Math.floor((clickedCellId - 1) / 9) * 9 + 1;
  const endRow = startRow + 8;

  const startCol = clickedCellId - Math.floor((clickedCellId - 1) / 9) * 9;
  const endCol = startCol + 72;
  // console.log(startCol, endCol);

  for (let i = startRow; i <= endRow; i++) {
    const cell = document.querySelector(`#cell-${i} input`);
    cell.classList.add("highlightRowCol");

    // cell.addEventListener("mousemove", (evt) => {
    //   cell.classList.remove("highlightRowCol", 2000);
    // });

    setTimeout(() => cell.classList.remove("highlightRowCol"), 5000);
  }

  for (let i = startCol; i <= endCol; i = i + 9) {
    const cell = document.querySelector(`#cell-${i} input`);
    // console.log(i);
    cell.classList.add("highlightRowCol");
    setTimeout(() => cell.classList.remove("highlightRowCol"), 5000);
  }
}

// Solve sudoku according to the difficulty level/mode
function setupSolBoard(board) {
  clearErrors();
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      const cellIdx = i * 9 + j + 1;
      const el = document.querySelector(`#cell-${cellIdx} input`);
      if (!el.disabled) {
        el.classList.add("solved");
        el.disabled = true;
        el.value = board[i][j];
      }
    });
  });
  document.getElementById("validate-btn").disabled = true;
  document.getElementById("validate-btn").classList.add("disable-validate");
}
//Solving sudoku on solve button click
document.getElementById("solve-btn").addEventListener("click", function () {
  const difficulty = document.querySelector(".mode-active");
  switch (difficulty.innerText) {
    case "Easy":
      setupSolBoard(easySolution);
      break;
    case "Medium":
      setupSolBoard(mediumSolution);
      break;
    case "Hard":
      setupSolBoard(hardSolution);
      break;
  }
});

// reset sudoku
function reset() {
  document.getElementById("validate-btn").disabled = false;
  document.getElementById("validate-btn").classList.remove("disable-validate");
  clearErrors();
  isValid = false;
  const difficulty = document.querySelector(".mode-active");
  switch (difficulty.innerText) {
    case "Easy":
      setupBoard(easyBoard);
      break;
    case "Medium":
      setupBoard(mediumBoard);
      break;
    case "Hard":
      setupBoard(hardBoard);
      break;
  }
}
// calling reset() on btn click
document.getElementById("reset-btn").addEventListener("click", function () {
  reset();
});
// newgame will reset the current mode
document.getElementById("newgame-btn").addEventListener("click", function () {
  reset();
});

var modal3 = document.getElementById("myModal3");

// Get the button that opens the modal
var btn3 = document.getElementById("exit-btn");

// Get the <span> element that closes the modal
var span3 = document.getElementsByClassName("close3")[0];

// When the user clicks on the button, open the modal
btn3.onclick = function () {
  modal3.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span3.onclick = function () {
  modal3.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
};