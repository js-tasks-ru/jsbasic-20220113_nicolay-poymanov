import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  initialTopCoordinate = null;
  mobileClientWidth = 767;

  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.initialTopCoordinate === undefined) {
      this.initialTopCoordinate = this.elem.getBoundingClientRect().top + this.getWindowScrollY();
    }

    if (this.isMobileDocument()) {
      this.setAbsolutePosition();

      return null;
    }

    if (this.getWindowScrollY() > this.initialTopCoordinate) {
      let leftIndent = Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        this.getClientWidth() - this.elem.offsetWidth - 10
      ) + 'px';

      this.setFixedPosition(leftIndent);
    } else {
      this.setAbsolutePosition();
    }
  }

  setAbsolutePosition() {
    const params = {
      position: '',
      top: '',
      zIndex: '',
      right: '',
      left: ''
    };

    return this.modifyElemStyle(params);
  }

  setFixedPosition(leftIndent) {
    const params = {
      position: 'fixed',
      top: '50px',
      zIndex: 1e3,
      right: '10px',
      left: leftIndent
    };

    return this.modifyElemStyle(params);
  }

  modifyElemStyle(params) {
    Object.assign(this.elem.style, params);
  }

  isMobileDocument() {
    return this.getClientWidth() <= this.mobileClientWidth;
  }

  getClientWidth() {
    return document.documentElement.clientWidth;
  }

  getWindowScrollY() {
    return window.scrollY;
  }
}
