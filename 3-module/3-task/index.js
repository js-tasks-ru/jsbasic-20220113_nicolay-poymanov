function camelize(str) {
  let words = str.split('-');

  words = words.map((word, index) => index > 0 ? ucFirst(word) : word);

  return words.join('');
}

function ucFirst(str) {
  if (str.length === 0) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}
