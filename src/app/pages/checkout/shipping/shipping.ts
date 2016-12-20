import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'shipping',
  templateUrl: 'shipping.html',
})
export class Shipping {
  data: any = {};
  toast: any = { show: false, message: '' };
  processing: boolean = false;
  constructor(private router: Router, private af: AngularFire, private _checkoutService: CheckoutService) { }
  ngOnInit(): void {
    this.data = {
      name: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    }
  }
  saveShipping(): void {
    if (this.validate()) {
      this._checkoutService.setShipping(this.data);
      this.router.navigate(['/payment']);
    } else {
      this.showToast('Please ensure all required fields are filled out and try again', false);
    }
  }
  validate(): boolean {
    if (this.isValid(this.data.name))
      if (this.isValid(this.data.email))
        if (this.isValid(this.data.address1))
          if (this.isValid(this.data.city))
            if (this.isValid(this.data.state))
              if (this.isValid(this.data.zip))
                return true;
    return false;
  }
  isValid(field): boolean {
    return field == null || field.length < 1 ? false : true;
  }
  showToast(message, success) {
    var self = this;
    self.toast.message = message;
    self.toast.success = success;
    self.toast.show = true;
    setTimeout(function() {
      self.toast.show = false;
    }, 2000);
  }
}
