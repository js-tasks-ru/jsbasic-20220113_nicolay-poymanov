function getMinMax(str) {
  let items = str.split(' ');

  items = items.filter((item) => {
    return Number.isInteger(Number.parseInt(item));
  });

  return {
    min: Math.min(...items),
    max: Math.max(...items)
  };
}
