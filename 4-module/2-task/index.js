function makeDiagonalRed(table) {
  const rows = table.rows;
  const rowsCount = rows.length;

  for (let i = 0; i < rowsCount; i++) {
    rows[i].cells[i].style.backgroundColor = 'red';
  }
}

