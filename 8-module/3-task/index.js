export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    }
    else if (newCount === 0) {
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }

  findCartItemByProductId(productId) {
    return this.cartItems.find((cartItem) => {
      return cartItem.product.id === productId;
    });
  }
}

