import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  _elem = null;
  _rootElement = null;
  _contentElement = null;
  _imagesPath = '/assets/images';
  _carouselImagesPath = this._imagesPath + '/carousel';
  _controlsElements = {
    left: null,
    right: null
  }

  constructor(slides) {
    this._slides = slides;
    this._totalSlides = slides.length;
    this._currentSlide = 1;

    this._buildRootElement();
    this._buildContent();

    this._updateControlsVisibility();

    this._addLeftControlEvent();
    this._addRightControlEvent();
  }

  get elem() {
    return this._elem;
  }

  _buildRootElement() {
    const carouselElement = document.createElement('div');
    carouselElement.classList.add('carousel');

    const controlRight = createElement(`
        <div class="carousel__arrow carousel__arrow_right">
            <img src="${this._imagesPath}/icons/angle-icon.svg" alt="icon">
        </div>
    `);

    const controlLeft = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="${this._imagesPath}/icons/angle-left-icon.svg" alt="icon">
      </div>
    `);

    carouselElement.append(controlRight);
    carouselElement.append(controlLeft);

    const carouselBody = document.createElement('div');
    carouselBody.classList.add('carousel__inner');

    carouselElement.append(carouselBody);

    this._rootElement = carouselElement;
    this._contentElement = carouselBody;
    this._controlsElements.right = controlRight;
    this._controlsElements.left = controlLeft;
    this._elem = this._rootElement;
  }

  _buildContent() {
    for (const slide of this._slides) {
      const slideElement = this._buildSlide(slide);
      this._contentElement.append(slideElement);
      this._createSlideAddProductEvent(slideElement);
    }
  }

  _buildSlide(slide) {
    const id = slide.id;
    const name = slide.name;
    const image = `${this._carouselImagesPath}/${slide.image}`;
    const price = slide.price.toFixed(2);

    return createElement(`
       <div class="carousel__slide" data-id="${id}">
        <img src="${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="${this._imagesPath}/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
  }

  _createSlideAddProductEvent(slideElement) {
    const slideId = slideElement.dataset.id;

    const productAddEvent = new CustomEvent('product-add', {
      detail: slideId,
      bubbles: true
    });

    slideElement.addEventListener('click', (event) => {
      const button = event.target.closest('button');

      if (!button) {
        return;
      }

      event.target.dispatchEvent(productAddEvent);
    });
  }

  _addLeftControlEvent() {
    const carousel = this;

    this._controlsElements.left.addEventListener('click', function () {
      const contentElementWidth = carousel._contentElement.offsetWidth;
      const translateValue = -((carousel._currentSlide - 1) * contentElementWidth) + contentElementWidth;
      carousel._contentElement.style.transform = `translateX(${translateValue}px)`;
      carousel._currentSlide--;

      carousel._updateControlsVisibility();
    });
  }

  _addRightControlEvent() {
    const carousel = this;

    this._controlsElements.right.addEventListener('click', function () {
      const contentElementWidth = carousel._contentElement.offsetWidth;
      const translateValue = carousel._currentSlide * contentElementWidth;
      carousel._contentElement.style.transform = `translateX(-${translateValue}px)`;
      carousel._currentSlide++;

      carousel._updateControlsVisibility();
    });
  }

  _updateControlsVisibility() {
    // Если слайд один или вообще отсутствуют
    if (this._totalSlides <= 1) {
      this._hideControl(this._controlsElements.left);
      this._hideControl(this._controlsElements.right);
      return;
    }

    // Если первый слайд
    if (this._currentSlide - 1 === 0) {
      this._hideControl(this._controlsElements.left);
      this._showControl(this._controlsElements.right);
      return;
    }

    // Если последний слайд
    if (this._currentSlide + 1 > this._totalSlides) {
      this._showControl(this._controlsElements.left);
      this._hideControl(this._controlsElements.right);
      return;
    }

    this._showControl(this._controlsElements.left);
    this._showControl(this._controlsElements.right);
  }

  _showControl(control) {
    control.style.display = 'block';
  }

  _hideControl(control) {
    control.style.display = 'none';
  }
}
