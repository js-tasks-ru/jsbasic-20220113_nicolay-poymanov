function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
    let value = salaries[key];

    if (Number.isInteger(value)) {
      sum += value;
    }
  }

  return sum;
}
