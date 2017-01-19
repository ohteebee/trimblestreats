import { Component, Input } from '@angular/core';

@Component({
  selector: 'toast',
  templateUrl: 'toast.html'
})
export class Toast {
  @Input('toast') toast: string;
}
