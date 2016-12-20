import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
@Component({
    selector: 'home',
    templateUrl: 'home.html',
})
export class Home {
    email: string = '';
    mailingList: any;
    showSubscribe: boolean = false;
    test: boolean = false;
    showSuccess: boolean = false;
        constructor(af: AngularFire) {
          this.mailingList  =af.database.list('mailingList');
    }
    showModal() {
      this.showSubscribe = true;
      console.log('here');
    }

    validate() {
      console.log('change')
      if (this.email.includes('@')) return false;
      return true;
    }
    subscribe() {
        // console.log(this.email);
        this.mailingList.push(this.email);
        this.email = '';
        this.showSuccess = true;
        this.showSubscribe = false;

        var $ctxt = this;
        setTimeout(function() {
          $ctxt.showSuccess = false;
        },2000);
        // this.email = 'test@gmai.com';
        // let params = 'to=mierze@gmail.com&from=TrimblesTreats Mail Service<' + this.email + '>&subject=New email!&message=' + this.email;
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // this.http.post('http://otb-api.herokuapp.com/api/email', params)
        //     .map((res: Response) => res.json());
        // let xhr = new XMLHttpRequest();
        // let self = this;
        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         self.email = '';
        //     }
        // }
        // xhr.open('POST', 'http://otb-api.herokuapp.com/api/email', true);
        // xhr.setRequestHeader('Content-type', '');
        // xhr.send(');

    }
}
