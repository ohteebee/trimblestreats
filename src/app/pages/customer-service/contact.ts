import { Component } from '@angular/core';
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
  constructor(private http: Http) {
    this.message = {
      from: '',
      name: '',
      content: ''
    };
  }

  send() {
    this.processing = true;
    let data = { message: this.makeMessage() };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let self = this;
    this.http.post('https://otb-api.now.sh/api/email/trimblecontact', data)
      .toPromise()
      .then(res => {
        res = res.json();
        console.log(res);
        // TODO
        if (res['success'] > 0) {
          // self.displayError();
          self.showToast('Successfully sent email to Trimble\'s Treats!', true);
          self.resetData();
        } else {
          self.showToast('There was an error sending email', false);
        }
        self.processing = false;
      }
      )
      .catch(self.handleError);
  }
  handleError() {
    this.processing = false;
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
  makeMessage(): string {
    let msg =
      this.message.name + ', ' + this.message.from + ', ' + this.message.content;
    console.log(msg)
    return msg;
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
