import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  store: any;
  cart: any[] = [];
  constructor() {
    this.store = window.localStorage;
    this.cart = this.getCartFromStore();
    if (this.cart == null) this.cart = [];
  }

  setCart(items: any[]) {
    this.cart = items;
    this.store.setItem('cart', JSON.stringify(this.cart));
  }

  addItem(item: any): boolean {
    console.log(item.key);
    console.log(item);
    let added = false, over = false;
    for (let i of this.cart) {
      if (this.isSame(i, item)) {
        i.quantity += item.quantity;
        if (i.quantity > item.max) {
          i.quantity = item.max;
          over = true;
        }
        added = true;
      }
    }
    if (!added) {
      this.cart.push(item);
      if (item.quantity > item.max) {
        item.quantity = item.max;
        over = true;
      }
    }
    this.setCart(this.cart);
    return !over;
  }

  removeItem(item) {
    let index = -1;
    this.cart = this.getCartFromStore();
    for (let i of this.cart) {
      if (this.isSame(i, item)) {
        index = this.cart.indexOf(i, 0);
      }
    }
    if (index > -1) {
      this.cart.splice(index, 1);
      this.setCart(this.cart);
    }
    return 1;
  }



  getCart(): any[] {
    return this.cart;
  }
  getCartFromStore(): any[] {
    let cart = JSON.parse(this.store.getItem('cart'));
    if (cart == null)
      return [];
    return cart;
  }
  removeCartFromStore() {
    this.store.removeItem('cart');
  }
  updateItem(item) {
    if (item.quantity == 0) {
      return this.removeItem(item);
    } else {
      let cart = this.getCartFromStore();
      if (cart == null) return;
      for (let i of cart) {
        if (this.isSame(i, item)) {
          i.quantity = item.quantity;
        }
      }
      this.setCart(cart);
    }
  }

  isSame(a, b) {
    if (a.key == b.key && a.type == b.type) {
      return true;
    }
    return false;
  }
}
