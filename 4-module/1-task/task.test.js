describe('4-module-1-task', () => {
  const friends = [
    {
      firstName: 'Artsiom',
      lastName: 'Mezin',
    },
    {
      firstName: 'Ilia',
      lastName: 'Kantor',
    },
    {
      firstName: 'Christopher',
      lastName: 'Michael',
    },
  ];

  it('функция должна возвращать HTML список', () => {
    const ul = makeFriendsList(friends);

    expect(ul && ul.constructor).toEqual(HTMLUListElement, 'Результат вызова функции не HTMLUListElement');
  });

  it('число элементов в списке и число объектов в массиве должны быть одинаковыми', () => {
    const ul = makeFriendsList(friends);
    const lis = ul && ul.querySelectorAll('li');

    expect(lis.length).toEqual(friends.length, 'Отличается длина списка и массива данных');
  });

  it('содержимое элементов списка должно соответствовать именам и фамилиям друзей', () => {
    const ul = makeFriendsList(friends);
    const lis = ul && ul.querySelectorAll('li');

    lis.forEach((li, index) => {
      const actualFirstName = li.innerHTML.includes(friends[index].firstName);
      const actualLastName = li.innerHTML.includes(friends[index].lastName);

      expect(actualFirstName).toEqual(true);
      expect(actualLastName).toEqual(true);
    });
  });
});
