import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.modal = new Modal();

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return null;
    }

    let cartItem = this.findCartItemByProductId(product.id);

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = {
        product,
        count: 1,
      };

      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.findCartItemByProductId(productId);

    if (!cartItem) {
      return null;
    }

    let newCount;

    if (amount === 1) {
      newCount = ++cartItem.count;
    } else if (amount === -1) {
      newCount = --cartItem.count;
    } else {
      return null;
    }

    if (newCount < 0) {
      return null;
    } else if (newCount === 0) {
      this.cartItems = this.cartItems.filter((currentCartItem) => {
        return currentCartItem.product.id !== cartItem.product.id;
      });
    } else {
      cartItem.count = newCount;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, cartItem) => {
      return totalCount + cartItem.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, cartItem) => {
      return totalPrice + (cartItem.product.price * cartItem.count);
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal.setTitle('Your order');

    this.cartItems.forEach((cartItem) => {
      this.modal.setBody(this.renderProduct(cartItem.product, cartItem.count));
    });

    this.modal.setBody(this.renderOrderForm());

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.querySelector('.is-modal-open')) {
      return null;
    }

    if (this.getTotalCount() === 0) {
      this.modal.close();
      return null;
    }

    const modalBody = document.querySelector('.modal__body');

    const product = cartItem.product;
    const productId = product.id;

    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    event.preventDefault();

    event.target.querySelector('button[type="submit"]').classList.add('is-loading');

    const formData = new FormData(event.target);

    const responsePromise = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    });

    responsePromise
      .then((response) => {
        this.cartItems = [];
        this.cartIcon.update(this);

        document.querySelector('.modal__body').innerHTML = null;

        this.modal.setTitle('Success!');
        this.modal.setBody(createElement(`<p>Order successful! Your order is being cooked :) <br>
           We’ll notify you about delivery time shortly.<br><img src="/assets/images/delivery.gif"></p>`));
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => {
      this.renderModal();

      document.querySelector('.modal__body').addEventListener('click', (event) => {
        let button = null;

        if (event.target.closest('.cart-counter__button')) {
          button = event.target.closest('.cart-counter__button');
        } else if (event.target.classList.contains('cart-counter__button')) {
          button = event.target;
        }

        if (!button) {
          return null;
        }

        const cartItem = event.target.closest('.cart-product');

        if (!cartItem) {
          return null;
        }

        const productId = cartItem.dataset.productId;

        let amount;

        if (button.classList.contains('cart-counter__button_plus')) {
          amount = 1;
        } else if (button.classList.contains('cart-counter__button_minus')) {
          amount = -1;
        } else {
          return null;
        }

        this.updateProductCount(productId, amount);
      });

      document.querySelector('.cart-form').addEventListener('submit', (event) => {
        this.onSubmit(event);
      });
    };
  }

  findCartItemByProductId(productId) {
    return this.cartItems.find((cartItem) => {
      return cartItem.product.id === productId;
    });
  }
}
