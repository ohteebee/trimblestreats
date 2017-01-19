import { Component, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'contact',
  templateUrl: 'contact.html',
})
export class Contact {
  message: any = {};
  processing: boolean = false;
  toast: any = { show: false, message: '', success: true };
  constructor(private http: Http, private _zone: NgZone) {
    this.message = {
      from: '',
      name: '',
      content: ''
    };
  }

  send(): void {
    this.processing = true;
    this._zone.run(() => {


      let data = {
        message:
        this.message.name + ', ' + this.message.from + ', ' + this.message.content
      }, headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }),
        options = new RequestOptions({ headers: headers });
      let self = this;
      this.http.post('https://otb-api.now.sh/api/email/trimblecontact', data)
        .toPromise()
        .then(res => {
          res = res.json();
          console.log(res);
          if (res['success'] > 0) {
            self.showToast('Successfully sent email to Trimble\'s Treats!', true);
            self.resetData();
          } else {
            self.showToast('There was an error sending email', false);
          }
          self.processing = false;
        })
        .catch(this.handleError);
    });
  }
  handleError(): void {
    this.processing = false;
    console.log('err')
    this.showToast('There was an error contacting server.', false);
  }
  validate(): boolean {
    //ensure something is filled out
    return true;
    // if ((this.data.email).length && (this.data.name).length && (this.data.security.answer).length) {
    //     return true;
    // }
    // return false;
  }
  resetData() {
    this.message = { name: '', from: '', content: '' };
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
