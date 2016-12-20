import { Component } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'store-item',
  templateUrl: 'item.html',
})
export class Item {
  items: any;
  item: any;
  quantity: number = 1;
  toast: any = { show: false, message: '', success: true };
  constructor(private route: ActivatedRoute, private _cartService: CartService) {
  }
  ngOnInit() {
    this.item = JSON.parse(this.route.snapshot.params['item']);
    if (this.item.options.length > 0) {
      this.applyOption(this.item.options[0]);
    }
    this.parse();
  }

  applyOption(option) {
    this.item.data = option;
  }
  addToCart(item) {
    //this.item add to cart
    if (this.validate()) {
      item.data.serving = item.serving;
      item.data.type = item.type;
      item.data.quantity = this.quantity;
      if (item.data.max != null)
        item.data.max = item.max;
      else {
        item.data.max = 100;
      }
      let success = (this._cartService.addItem(item.data));
      if (success) {
        var $ctxt = this;
        if (this.quantity > 1) {
          this.showToast('Items added to cart!', true);
        } else {
          this.showToast('Item added to cart!', true);
        }
      } else {
        this.showToast('Warning, your cart is now at capacity for ' + item.type + '!', false);
      }

    } else {
      this.showToast('Only positive integers please!', false);
    }

  }
  parse() {
    if (this.item != null && this.item) {
      for (let option of this.item.options) {
        if (option.key == this.item.default) {
          this.item.data = option;
        }
      }
    }
  }
  reset(): void {
    this.quantity = 1;
  }
  validate(): boolean {
    if (this.isInteger(this.quantity)) {
      return true;
    }
    return false;

  }
  isInteger(x: number): any {
    if (x < 1) return false;
    return x % 1 === 0;
  }
  showToast(message, success) {
    var self = this;
    self.toast.success = success;
    self.toast.message = message;
    self.toast.show = true;
    setTimeout(function() {
      self.toast.show = false;
    }, 2000);
  }
}
