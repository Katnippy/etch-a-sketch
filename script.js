const container = document.querySelector('#container')
function drawColumn(cells) {
  const column = document.createElement('div');
  column.className = 'column';
  column.appendChild(cells);
  container.appendChild(column);
}

// Draw amount * amount cells with / 16 columns.
function drawCells(amount) {
  const cells = document.createDocumentFragment();
  for (let i = 0; i <= amount; i++) {
    if (i > 0 && i % 16 === 0) {
      drawColumn(cells)
    }
    const cell = document.createElement('div');
    cell.className = 'cell';
    cells.appendChild(cell);
  }
} 

drawCells(256);

// Colour cells on mouseover in the currently selected colour.
let selectedColour = 'black';
const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  cell.addEventListener('mouseover', () => {
    cell.style = `background-color: ${selectedColour};`;
  });
});

// Change between the fill, clear, and colour modes when the appropriate 
// button is selected.
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