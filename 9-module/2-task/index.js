import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  #carouselElement = null;
  #ribbonMenuElement = null;
  #sliderElement = null;
  #cartIconElement = null;
  #productsElement = null;
  #cart = null;
  #cartIcon = null;
  #productsGrid = null;
  #stepSlider = null;
  #ribbonMenu = null;
  #products = [];
  #filterElements = {
    noNuts: null,
    vegeterianOnly: null
  };

  constructor() {
    this.#carouselElement = document.querySelector('[data-carousel-holder]');
    this.#ribbonMenuElement = document.querySelector('[data-ribbon-holder]');
    this.#sliderElement = document.querySelector('[data-slider-holder]');
    this.#cartIconElement = document.querySelector('[data-cart-icon-holder]');
    this.#productsElement = document.querySelector('[data-products-grid-holder]');
    this.#filterElements.noNuts = document.getElementById('nuts-checkbox');
    this.#filterElements.vegeterianOnly = document.getElementById('vegeterian-checkbox');
  }

  async render() {
    this.#renderCarousel();
    this.#renderRibbonMenu();
    this.#renderSlider();
    this.#renderCartIcon();
    await this.#renderProducts();
    this.#addEventListeners();
  }

  #renderCarousel() {
    const carousel = new Carousel(slides);

    this.#carouselElement.append(carousel.elem);
  }

  #renderRibbonMenu() {
    this.#ribbonMenu = new RibbonMenu(categories);
    this.#ribbonMenuElement.append(this.#ribbonMenu.elem);
  }

  #renderSlider() {
    this.#stepSlider = new StepSlider({steps: 5, value: 3});
    this.#sliderElement.append(this.#stepSlider.elem);
  }

  #renderCartIcon() {
    this.#cartIcon = new CartIcon();
    this.#cart = new Cart(this.#cartIcon);
    this.#cartIconElement.append(this.#cartIcon.elem);
  }

  async #renderProducts() {
    const response = await fetch('products.json');
    this.#products = await response.json();

    this.#productsGrid = new ProductsGrid(this.#products);
    this.#productsElement.innerHTML = null;
    this.#productsElement.append(this.#productsGrid.elem);

    this.#productsGrid.updateFilter({
      noNuts: null,
      vegeterianOnly: null,
      maxSpiciness: this.#stepSlider.value,
      category: this.#ribbonMenu.value
    });
  }

  #addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail;

      const product = this.#products.find((currentProduct) => {
        return currentProduct.id === productId;
      });

      if (!product) {
        return null;
      }

      this.#cart.addProduct(product);
    });

    this.#stepSlider.elem.addEventListener('slider-change', (event) => {
      const spiciness = event.detail;

      this.#productsGrid.updateFilter({
        maxSpiciness: spiciness
      });
    });

    this.#ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      const category = event.detail;

      this.#productsGrid.updateFilter({category});
    });

    this.#filterElements.noNuts.addEventListener('change', () => {
      this.#productsGrid.updateFilter({noNuts: this.#filterElements.noNuts.checked});
    });

    this.#filterElements.vegeterianOnly.addEventListener('change', () => {
      this.#productsGrid.updateFilter({vegeterianOnly: this.#filterElements.vegeterianOnly.checked});
    });
  }
}
