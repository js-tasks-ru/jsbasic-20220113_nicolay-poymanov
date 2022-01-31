function highlight(table) {
  const rows = table.rows;
  const rowsCount = rows.length;

  for (let i = 0; i < rowsCount; i++) {
    const currentRow = rows[i];
    const availableValue = currentRow.cells[3].dataset.available;
    const genderValue = currentRow.cells[2].innerText;
    const ageValue = parseInt(currentRow.cells[1].innerText);

    if (availableValue === 'true') {
      currentRow.classList.add('available');
    } else if (availableValue === 'false') {
      currentRow.classList.add('unavailable');
    } else {
      currentRow.setAttribute('hidden', true);
    }

    if (genderValue === 'm') {
      currentRow.classList.add('male');
    } else if (genderValue === 'f') {
      currentRow.classList.add('female');
    }

    if (ageValue < 18) {
      currentRow.style.textDecoration = 'line-through';
    }
  }
}
