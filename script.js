function drawColumn(cells) {
  const container = document.querySelector('#container');
  const column = document.createElement('div');
  column.className = 'column';
  column.appendChild(cells);
  container.appendChild(column);
}

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

const grid = document.querySelectorAll('.cell');
grid.forEach((c) => {
  c.addEventListener('mouseover', () => {
    c.style = 'background-color: black;';
  });
});


