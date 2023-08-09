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

// On submit, draw a grid with the desired dimensions.
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const xAmount = document.querySelector('#x-amount').value;
  const yAmount = document.querySelector('#y-amount').value;
  drawGrid(xAmount, yAmount);
  printCurrentGridSize(xAmount, yAmount);
});

// Draw a grid of colourable cells with its dimensions defined by user input.
let selectedColour = 'black';
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
        cell.style = `background-color: ${selectedColour};`;
      }
    });
    cells.appendChild(cell);
  }
}

// Draw a default 150x150 grid on page load.
window.addEventListener('load', () => {
  drawGrid(150, 150);
  printCurrentGridSize(150, 150);
});

// Prevent cells from being draggable.
document.addEventListener('dragstart', (e) => {
  if (e.target.parentNode.localName === 'div') {
    e.preventDefault();
  }
});

// TODO: make colours selected look held down
// Change between the fill, clear, and transparent and colour modes when the
// user selects the appropriate button.
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.getAttribute('id') === 'fill') {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.style = `background-color: ${selectedColour};`;
    });
    } else if (button.getAttribute('id') === 'clear') {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell) => {
        cell.style.removeProperty('background-color');
    });
    } else {
      selectedColour = button.getAttribute('id');
    }
  });
});