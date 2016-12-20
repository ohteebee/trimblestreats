import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { Router } from '@angular/router';

@Component({
    selector: 'store',
    templateUrl: 'store.html',
})
export class Store {
    items: any = [];
    test: string = 'cats';
    item: any = {};
    colors: string[] = ['danger', 'warning', 'success', 'info'];
    order: any = {};
    showItem: boolean = false;
    constructor(af: AngularFire, private router: Router, private _cartService: CartService) {
      // this._cartService.hello();
      // this._cartService.setCart([1,2,3])
      this._cartService.getCart();
        this.order.quantity = 1;
        this.items = af.database.list('items');
    }

    openItem(item) {
        //navigate to item
        this.router.navigate(['/item', JSON.stringify(item)]);
    }

    getColor(index) {
      index = index%this.colors.length;
      return this.colors[index];
    }

    getDescription() {

    }
    addToCart() {
        alert('you have added an item to your cart' + JSON.stringify(this.item));
    }

}
