describe('2-module-3-task', () => {
  it('должно складывать числа', () => {
    calculator.read(3, 5);
    expect(calculator.sum()).toBe(8);
  });

  it('должно умножать числа', () => {
    calculator.read(3, 5);
    expect(calculator.mul()).toBe(15);
  });

  it('должно корректно складывать числа с 0 первым аргументом', () => {
    calculator.read(0, 1);
    expect(calculator.sum()).toBe(1);
  });

  it('должно корректно складывать числа с 0 вторым аргументом', () => {
    calculator.read(1, 0);
    expect(calculator.sum()).toBe(1);
  });
});
