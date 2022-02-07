import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  _elem = null;
  _imagesPath = '/assets/images';
  _productImagesPath = this._imagesPath + '/products';

  constructor(product) {
    this._product = product;
    this._buildProductContainer();
    this._createProductAddEvent();
  }

  get elem() {
    return this._elem;
  }

  _buildProductContainer() {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    cardElement.append(this._buildProductTop());
    cardElement.append(this._buildProductBody());

    this._elem = cardElement;
  }

  _buildProductTop() {
    const price = this._product.price.toFixed(2);
    const imageUrl = `${this._productImagesPath}/${this._product.image}`;

    return createElement(`
        <div class="card__top">
          <img src="${imageUrl}" class="card__image" alt="product">
          <span class="card__price">€${price}</span>
        </div>
    `);
  }

  _buildProductBody() {
    const name = this._product.name;

    return createElement(`
         <div class="card__body">
            <div class="card__title">${name}</div>
            <button type="button" class="card__button">
              <img src="${this._imagesPath}/icons/plus-icon.svg" alt="icon">
            </button>
         </div>
    `);
  }

  _createProductAddEvent() {
    const productAddEvent = new CustomEvent('product-add', {
      detail: this._product.id,
      bubbles: true
    });

    this._elem.addEventListener('click', (event) => {
      const button = event.target.closest('button');

      if (!button) {
        return;
      }

      event.target.dispatchEvent(productAddEvent);
    });
  }
}
