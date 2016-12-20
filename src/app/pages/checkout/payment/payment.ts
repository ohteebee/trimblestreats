import { Component, NgZone } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { CheckoutService } from '../checkout.service';
import { CartService } from '../../store/cart.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'payment',
  templateUrl: 'payment.html'
})
export class Payment {
  formData: any = {};
  processing: boolean = false;
  showSuccess: boolean = false;
  message: string = '';
  errorMessage: string = '';
  cardNumber: any = '';
  expiryMonth: any = '';
  expiryYear: any = '';
  price: any = {};
  cvc: any = '';
  constructor(
    private af: AngularFire,
    private http: Http,
    private _checkoutService: CheckoutService,
    private _cartService: CartService,
    private _zone: NgZone,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.price = this._checkoutService.getTotal(this._cartService.getCartFromStore()) + 10;
  }
  validate(): boolean {
    if (this.cardNumber && this.expiryMonth && this.expiryYear && this.cvc && this.cardNumber.length && this.expiryMonth.length && this.expiryYear.length && this.cvc.length) {
      return true;
    }
    return false;
  }
  getToken() {
    var self = this;
    this.message = 'Processing...';
    this.processing = true;
    //validate
    if (!this.validate()) {
      this.processing = false;
      this.handleError('Please fill out all fields');
      return;
    }
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          let data = {
            stripeToken: response.id,
            price: this.price
          };

          this.http.post('https://otb-api.now.sh/api/payment', data)
            .toPromise()
            .then(res => {
              res = res.json();
              if (res != null) {
                if (res.toString() == '1') {
                  self.emailReceipt();
                } else {
                  self.handleError('Error with payment server #001.');
                }
              } else {
                self.handleError('Error with payment server #002.');
              }
            }).catch(function(e) {
              self.handleError('Error with payment server #003');
            });
        } else {
          self.handleError(response.error.message);
        }
      });
    });

  }

  emailReceipt(): void {
    let data = this.makeMessage();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let self = this;
    this.http.post('https://otb-api.now.sh/api/email/trimblestreats', data)
      .toPromise()
      .then(res => {
        res = res.json();
        //empty cart
        if (res['success'] > 0) {
          self._cartService.removeCartFromStore();
          self._checkoutService.reset();
          self.message = 'Payment was successful.';
          self.showSuccess = true;
          //success
          self.showToast();
        } else {
          self.handleError('Error emailing receipt.');
        }
      }).catch(self.handleError);
  }

  handleError(msg): void {
    if (!msg) {
      msg = 'Error emailing receipt.';
    }
    this.errorMessage = msg;
    this.processing = false;
  }

  makeMessage(): any {
    let message = '';
    let data = { 'items': {}, 'shipping': {} };
    data.items = this._checkoutService.getOrder();
    data.shipping = this._checkoutService.getShipping();
    return data;
  }

  showToast(): void {
    setTimeout(
      function() {
        this.showSuccess = false;
        this.router.navigate(['/home']);
      }, 2000);
    this.showSuccess = true;
  }
}
