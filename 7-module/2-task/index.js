import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modalClass = 'modal';
  #modalOpenClass = 'is-modal-open';
  #modalElement = null;
  #modalTitleElement = null;
  #modalContentElement = null;
  #modalCloseButtonElement = null;
  #imagesPath = '/assets/images';

  constructor() {
    this.#initStructure();
    this.#addCloseButtonEvent();
    this.#addKeydownEvent();
  }

  #initStructure() {
    const modal = createElement(`
        <div class="${this.#modalClass}">

        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="${this.#imagesPath}/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.#modalElement = modal;
    this.#modalTitleElement = modal.querySelector('.modal__title');
    this.#modalContentElement = modal.querySelector('.modal__body');
    this.#modalCloseButtonElement = modal.querySelector('.modal__close');
  }

  #addCloseButtonEvent() {
    this.#modalCloseButtonElement.addEventListener('click', () => {
      this.close();
    });
  }

  #addKeydownEvent() {
    const modal = this;

    document.body.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        modal.close();
      }
    }, {once: true});
  }

  setTitle(title) {
    this.#modalTitleElement.innerText = title;
  }

  setBody(content) {
    this.#modalContentElement.append(content);
  }

  open() {
    document.body.append(this.#modalElement);
    document.body.classList.add(this.#modalOpenClass);
  }

  close() {
    if (!document.body.classList.contains(this.#modalOpenClass)) {
      return;
    }

    this.#modalTitleElement.innerText = null;
    this.#modalContentElement.innerHTML = null;
    document.body.classList.remove(this.#modalOpenClass);
    document.querySelector(`.${this.#modalClass}`).remove();
  }
}
