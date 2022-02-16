import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #categories = [];
  #rootElement = null;
  #contentElement = null;
  #controlsElements = {
    left: null,
    right: null
  }
  #controlsVisibleClass = 'ribbon__arrow_visible';
  #itemActiveClass = 'ribbon__item_active';
  #itemClass = 'ribbon__item';
  $scrollWidth = 350;
  #imagesPath = '/assets/images';

  #elem = null;

  constructor(categories) {
    this.#categories = categories;

    this.#initStructure();
    this.#initContent();
    this.#addLeftControlEvent();
    this.#addRightControlEvent();
    this.#addContentScrollEvent();
    this.#addContentClickEvent();
  }

  get elem() {
    return this.#elem;
  }

  #initStructure() {
    const rootElement = document.createElement('div');
    rootElement.classList.add('ribbon');

    const controlLeftElement = createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="${this.#imagesPath}/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    const controlRightElement = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="${this.#imagesPath}/icons/angle-icon.svg" alt="icon">
      </button>
    `);

    const contentElement = document.createElement('div');
    contentElement.classList.add('ribbon__inner');

    rootElement.append(controlRightElement);
    rootElement.append(contentElement);
    rootElement.append(controlLeftElement);

    this.#rootElement = rootElement;
    this.#contentElement = contentElement;
    this.#controlsElements.right = controlRightElement;
    this.#controlsElements.left = controlLeftElement;
    this.#elem = rootElement;
  }

  #initContent() {
    for (const category of this.#categories) {
      const categoryElement = createElement(`
        <a href="#" class="${this.#itemClass} ${category.id === '' ? this.#itemActiveClass : ''}" data-id="${category.id}">${category.name}</a>
    `);

      this.#contentElement.append(categoryElement);
    }
  }

  #updateControlsVisibility() {
    let scrollLeft = this.#contentElement.scrollLeft;
    let scrollWidth = this.#contentElement.scrollWidth;
    let clientWidth = this.#contentElement.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    // Если "уперлись" в левую часть блока
    if (scrollLeft < 1) {
      this.#controlsElements.left.classList.remove(this.#controlsVisibleClass);
      this.#controlsElements.right.classList.add(this.#controlsVisibleClass);
    } else {
      this.#controlsElements.left.classList.add(this.#controlsVisibleClass);
    }

    // Если "уперлись" в правую часть блока
    if (scrollRight < 1) {
      this.#controlsElements.left.classList.add(this.#controlsVisibleClass);
      this.#controlsElements.right.classList.remove(this.#controlsVisibleClass);
    } else {
      this.#controlsElements.right.classList.add(this.#controlsVisibleClass);
    }
  }

  #addLeftControlEvent() {
    this.#controlsElements.left.addEventListener('click', () => {
      this.#contentElement.scrollBy(-(this.$scrollWidth), 0);
    });
  }

  #addRightControlEvent() {
    this.#controlsElements.right.addEventListener('click', () => {
      this.#contentElement.scrollBy(this.$scrollWidth, 0);
    });
  }

  #addContentScrollEvent() {
    this.#contentElement.addEventListener('scroll', () => {
      this.#updateControlsVisibility();
    });
  }

  #addContentClickEvent() {
    this.#contentElement.addEventListener('click', (event) => {
      event.preventDefault();

      if (!event.target.classList.contains(this.#itemClass)) {
        return;
      }

      const item = event.target;

      this.#rootElement.querySelectorAll('.' + this.#itemClass).forEach((currentItem) => currentItem.classList.remove(this.#itemActiveClass));
      item.classList.add(this.#itemActiveClass);

      const selectItemEvent = new CustomEvent('ribbon-select', {
        detail: item.dataset.id,
        bubbles: true
      });

      event.target.dispatchEvent(selectItemEvent);
    });
  }
}
