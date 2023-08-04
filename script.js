// TODO: add default grid when page loaded
const grid = document.querySelector('.grid')
function checkCellsNotAlreadyDrawn() {
  if (document.querySelector('.cell')) {
    const drawnColumns = document.querySelectorAll('.column');
    for (const drawnColumn of drawnColumns) {
      grid.removeChild(drawnColumn);
    }
  }
}

function drawColumn(cells) {
  const column = document.createElement('div');
  column.className = 'column';
  column.appendChild(cells);
  grid.appendChild(column);
}

// TODO: resize cells depending on amount (needs a maximum)
// Draw a grid of 
function drawGrid(xAmount, yAmount) {
  checkCellsNotAlreadyDrawn();
  const cells = document.createDocumentFragment();
  for (let i = 0; i <= xAmount * yAmount; i++) {
    if (i > 0 && i % yAmount === 0) {
      drawColumn(cells)
    }
    const cell = document.createElement('div');
    cell.className = 'cell';
    cells.appendChild(cell);
  }
}

// TODO: (currently broken) make error come from form instead of page
const form = document.querySelector('.form')
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const xAmount = document.querySelector('#x-amount').value;
  const yAmount = document.querySelector('#y-amount').value;
  if (xAmount.value === '' || yAmount.value === '') {
    alert('Please enter a number.');
  } else {
    drawGrid(xAmount, yAmount);
  }
});

// TODO: change behaviour from mouseover to click and hold
// Colour cells on mouseover in the currently selected colour.
let selectedColour = 'black';
const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  cell.addEventListener('mouseover', () => {
    cell.style = `background-color: ${selectedColour};`;
  });
});

// TODO: make colours selected look held down
// Change between the fill, clear, and transparent and colour modes when the 
// appropriate button is selected.
const buttons = document.querySelectorAll('button')
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.getAttribute('id') === 'fill') {
      cells.forEach((cell) => {
        cell.style = `background-color: ${selectedColour};`;
    });
    } else if (button.getAttribute('id') === 'clear') {
      cells.forEach((cell) => {
        cell.style.removeProperty('background-color');
    });
    } else {
      selectedColour = button.getAttribute('id');
    }
  });
});   