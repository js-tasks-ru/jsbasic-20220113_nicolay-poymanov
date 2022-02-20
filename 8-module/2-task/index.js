import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #products = null;
  #filters = null;
  #elem = null;
  #rootElement = null;
  #containerElement = null;

  constructor(products) {
    this.#products = products;
    this.#filters = {};

    this.#initStructure();
    this.#renderProducts(this.#products);
  }

  get elem() {
    return this.#elem;
  }

  #initStructure() {
    const rootElement = document.createElement('div');
    rootElement.classList.add('products-grid');

    const containerElement = document.createElement('div');
    containerElement.classList.add('products-grid__inner');

    rootElement.append(containerElement);

    this.#rootElement = rootElement;
    this.#containerElement = containerElement;

    this.#elem = rootElement;
  }

  #renderProducts(products) {
    this.#containerElement.innerHTML = null;

    products.forEach((product) => {
      this.#containerElement.append(new ProductCard(product).elem);
    });
  }

  updateFilter(filters) {
    this.#updateFiltersData(filters);

    let filteredProducts = this.#filterByNuts(this.#products);
    filteredProducts = this.#filterByVegeterian(filteredProducts);
    filteredProducts = this.#filterBySpiciness(filteredProducts);
    filteredProducts = this.#filterByCategory(filteredProducts);

    this.#renderProducts(filteredProducts);
  }

  #updateFiltersData(filters) {
    this.#filters = Object.assign(this.#filters, filters);
  }

  #filterByNuts(products) {
    return products.filter((product) => {
      const filterValue = this.#filters.noNuts;
      const productValue = product.nuts;

      if (!filterValue) {
        return true;
      }

      return !productValue || false;
    });
  }

  #filterByVegeterian(products) {
    return products.filter((product) => {
      const filterValue = this.#filters.vegeterianOnly;

      if (filterValue === undefined) {
        return true;
      }

      return product.vegeterian === filterValue;
    });
  }

  #filterBySpiciness(products) {
    return products.filter((product) => {
      const filterValue = this.#filters.maxSpiciness;

      if (filterValue === undefined) {
        return true;
      }

      return product.spiciness <= filterValue;
    });
  }

  #filterByCategory(products) {
    return products.filter((product) => {
      const filterValue = this.#filters.category;

      if (filterValue === undefined || filterValue.length === 0) {
        return true;
      }

      return product.category === filterValue;
    });
  }
}
