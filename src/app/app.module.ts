import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Home, Store, About, Checkout, Item, ShippingInfo, OrderRequests, Contact, Faqs, Shipping, CartService, Payment, CheckoutService } from './pages/index';
import { Toast } from './shared/index';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TrimblestreatsRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { firebaseCredentials } from './credentials';


import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = firebaseCredentials;
@NgModule({
  declarations: [
    AppComponent, Home, Store, About, Checkout, Item, ShippingInfo, OrderRequests, Contact, Faqs, Shipping, Payment, Toast
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    TrimblestreatsRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [CartService, CheckoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
