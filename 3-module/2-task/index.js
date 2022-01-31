function filterRange(arr, a, b) {
  return arr.filter((num) => {
    return a <= num && num <= b;
  });
}
