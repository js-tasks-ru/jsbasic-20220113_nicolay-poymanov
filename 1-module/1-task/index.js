function factorial(n) {
  if (n === 1 || n === 0) {
    return 1;
  }

  let result = n;

  for (let i = n - 1; i > 1; i--) {
    result *= i;
  }

  return result;
}
