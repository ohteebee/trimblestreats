import { Injectable } from '@angular/core';

@Injectable()
export class CheckoutService {
    data: any = {shipping: '', payment: '', order: ''};
    constructor() {}
    setShipping(data):void {
      this.data.shipping = data;
    }
    setPayment():void {

    }
    setOrder(items: any):void {
      this.data.order = items;
    }
    getShipping():any {
      return this.data.shipping;
    }
    getPayment():any {
      return this.data.payment;
    }
    getOrder():any {
      return this.data.order;
    }
    checkout(): void {

    }
    reset(): void {
      this.data = {shipping: '', payment: '', order: ''};
    }
    getPrice(item): number {
      return (item.price * item.quantity);
    }
    getTotal(items: any): number {
      let sum = 0;
      for (let i of items) {
        sum += +this.getPrice(i);
      }
      return sum;
    }
}
