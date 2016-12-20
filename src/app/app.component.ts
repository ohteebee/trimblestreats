import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './pages/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app works!';
  currentPage: string = 'home';
  pages: string[] = ['home', 'store', 'contact'];
  route: any;
  constructor(private router: Router, private _cartService: CartService) {
    this.router = router;
    this.router.events.subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  goToStore() {
    this.currentPage = 'store';
  }
  getNumItems() {
    let cart = this._cartService.getCartFromStore();
    if (cart == null) return 0;
    else return cart.length;
  }
  capitalize(page: String): string {
    return page.slice(0, 1).toUpperCase() + page.slice(1, page.length);
  }
}
