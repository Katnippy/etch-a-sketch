// TODO: fix for colour buttons vs mode buttons
function activateButton(buttonToActivate) {
  for (const button of buttons) {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
    }
  }
  buttonToActivate.classList.add('active');
}

// Change between the fill, eraser, clear, and colour modes when the user 
// selects the appropriate button.
let gridColour = 'white';
let brushColour = 'black';
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    activateButton(button);
    if (button.getAttribute('id') === 'fill') {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        gridColour = brushColour;
        cell.style = `background-color: ${brushColour};`;
        console.log(gridColour);
      });
    } else if (button.getAttribute('id') === 'eraser') {
      brushColour = gridColour;
    } else if (button.getAttribute('id') === 'clear') {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.style = `background-color: ${gridColour}`;
      });
    } else {
      brushColour = button.getAttribute('id');
    }
  });
});

function checkGridSizeNotAlreadyPrinted() {
  if (document.querySelector('.grid-size')) {
    document.querySelector('.grid-size').remove();
  }
}

function printCurrentGridSize(xAmount, yAmount) {
  checkGridSizeNotAlreadyPrinted();
  const gridSize = document.createElement('h4');
  gridSize.className = 'grid-size';
  gridSize.textContent = `${xAmount} x ${yAmount}`;
  const topElements = document.querySelector('#top-elements');
  topElements.appendChild(gridSize);
}

// Prevent cells from being draggable.
document.addEventListener('dragstart', (e) => {
  if (e.target.parentNode.localName === 'div') {
    e.preventDefault();
  }
});

// Split cells into equal columns.
const grid = document.querySelector('.grid');
function drawColumn(cells) {
  const column = document.createElement('div');
  column.className = 'column';
  column.appendChild(cells);
  grid.appendChild(column);
}

function checkGridNotAlreadyDrawn() {
  if (document.querySelector('.cell')) {
    const drawnColumns = document.querySelectorAll('.column');
    for (const drawnColumn of drawnColumns) {
      grid.removeChild(drawnColumn);
    }
  }
}

// Draw a grid of colourable cells with its dimensions defined by user input.
function drawGrid(xAmount, yAmount) {
  checkGridNotAlreadyDrawn();
  const cells = document.createDocumentFragment();
  for (let i = 0; i <= xAmount * yAmount; i++) {
    if (i > 0 && i % yAmount === 0) {
      drawColumn(cells);
    }
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('mouseover', (e) => {
      if (e.buttons === 1) {
        cell.style = `background-color: ${brushColour};`;
      }
    });
    cells.appendChild(cell);
  }
}

// On submit, draw a grid with the desired dimensions.
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const xAmount = document.querySelector('#x-amount').value;
  const yAmount = document.querySelector('#y-amount').value;
  drawGrid(xAmount, yAmount);
  printCurrentGridSize(xAmount, yAmount);
});

// Draw a default 150x150 grid on page load.
const defaultBrush = document.querySelector('#black');
window.addEventListener('load', () => {
  drawGrid(150, 150);
  printCurrentGridSize(150, 150);
  defaultBrush.classList.add('active');
});