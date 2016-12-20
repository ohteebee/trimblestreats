import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CartService } from '../store/cart.service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html'
})
export class Checkout {
  items: any = [];
  toast: any = { show: false, message: '', success: true };
  updateItem: any = {};
  showUpdate: boolean = false;
  constructor(
    private af: AngularFire,
    private router: Router,
    private _cartService: CartService,
    private _checkoutService: CheckoutService
  ) {
    this.getItems();
  }

  update(item) {
    // this._cartService.updateQuantity(item);
    this.showUpdate = true;
    this.updateItem = item;
    this.getItems();
  }
  closeUpdate(): void {
    this.showUpdate = false;
  }
  goToPayment(): void {
    this._checkoutService.setOrder(this.items);
  }
  saveUpdate(item) {
    this._cartService.updateItem(item);
    this.showUpdate = false;
    this.showToast('Quantity has been updated.', true);
  }
  remove(item) {
    this._cartService.removeItem(item);
    this.getItems();
    this.showToast('Successfully removed item!', true);
  }
  emptyCart() {
    this._cartService.removeCartFromStore();
    //refresh
    this.getItems();
    this.showToast('Your cart is now empty.', true);
  }
  getPrice(item: any): number {
    return this._checkoutService.getPrice(item);
  }
  getSubtotal(): string {
    this.getItems();
    return '$' + this._checkoutService.getTotal(this.items);
  }
  getTotal(): string {
    this.getItems();
    return '$' + (10 + this._checkoutService.getTotal(this.items));
  }
  getItems(): void {
    this.items = this._cartService.getCartFromStore();
  }
  showToast(message, success) {
    var self = this;
    self.toast.message = message;
    self.toast.success = success;
    self.toast.show = true;
    setTimeout(function() {
      self.toast.show = false;
      if (self.items.length == 0) {
        self.router.navigate(['/store']);
      }
    }, 2000);
  }
}
