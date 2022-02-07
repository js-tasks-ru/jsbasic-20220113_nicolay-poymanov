/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  _rootTableElement = null;
  _elem = null;

  constructor(rows) {
    this._rows = rows;
    this._createRootTableElement();
    this._buildRows();
    this._addDeleteEvent();
  }

  get elem() {
    return this._elem;
  }

  _buildRows() {
    const tbodyElement = this._rootTableElement.tBodies[0];
    tbodyElement.innerHTML = null;

    for (const row of this._rows) {
      const rowHtml = `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td></tr>`;
      tbodyElement.insertAdjacentHTML('beforeend', rowHtml);
    }
  }

  _addDeleteEvent() {
    this._elem.addEventListener('click', (event) => {
      const button = event.target.closest('button');

      if (!button) {
        return;
      }

      const row = button.closest('tr');

      if (!row) {
        return;
      }

      row.remove();
    });
  }

  _createRootTableElement() {
    const rootTable = document.createElement('table');
    rootTable.insertAdjacentHTML('afterbegin', '<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>');

    const rootBody = document.createElement('tbody');
    rootTable.append(rootBody);

    this._rootTableElement = rootTable;
    this._elem = rootTable;
  }
}
