function getMinMax(str) {
  let strings = str.split(' ');

  let nums = strings
    .filter((value) => isFinite(value)) // Отфильтровывает не числовые значения
    .map((value) => +value) // Преобразовывает элементы к числовому типу ("-38" => -38)

  // Сортирует массив по возрастанию, чтобы первый элемент был минимальный, а последний - максимальный.
  nums.sort((a, b) => {
    if (a > b) { return 1; }

    if (a < b) { return -1; }

    return 0;
  })

  let lastElementIndex = nums.length - 1; // Индекс последнего элемента на единицу меньше, чем длина массива

  let max = nums[lastElementIndex];
  let min = nums[0];

  return { min, max };
}
