import UserTable from './index.js';

describe('6-module-1-task', () => {
  let userTable;

  let clickEvent;

  beforeEach(() => {
    clickEvent = new MouseEvent('click', { bubbles: true });

    let rows = [
      {
        name: 'Вася',
        age: 25,
        salary: 1000,
        city: 'Самара'
      },
      {
        name: 'Петя',
        age: 30,
        salary: 1500,
        city: 'Москва'
      }
    ];

    userTable = new UserTable(rows);

    document.body.append(userTable.elem);
  });

  afterEach(() => {
    userTable.elem.remove();
  });

  it('свойство elem возвращает один и тот же елемент, при каждом обращении', () => {
    const elementFirstCall = userTable.elem;
    const elementSecondCall = userTable.elem;

    expect(elementFirstCall).toBe(elementSecondCall);
  });

  it('компонент должен отрисовать всех пользователей', () => {
    let rowsInHTMLlength = userTable.elem.querySelectorAll('tbody tr').length;

    expect(rowsInHTMLlength).toBe(2);
  });

  it('при клике на кнопку удаляется строка', () => {
    let buttons = userTable.elem.querySelectorAll('button');

    buttons[0].dispatchEvent(clickEvent);
    buttons[1].dispatchEvent(clickEvent);

    expect(userTable.elem.querySelector('tbody tr')).toBeNull();
  });
});
