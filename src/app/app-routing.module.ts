import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home, Store, Item, About, Checkout, Contact, ShippingInfo, OrderRequests, Faqs, Shipping, Payment} from './pages/index';

const routes: Routes = [
  { path: 'home', component: Home },
    {
        path: 'store',
        component: Store,
        data: {
            title: 'Store'
        }
    },
    { path: 'item/:item', component: Item },
    { path: 'checkout', component: Checkout },
    { path: 'about', component: About },
    { path: 'shipping-info', component: ShippingInfo },
    { path: 'shipping', component: Shipping },
    { path: 'order-requests', component: OrderRequests },
    { path: 'payment', component: Payment },
    { path: 'contact', component: Contact },
    { path: 'faqs', component: Faqs },
    { path: '**', component: Home },
    { path: '', component: Home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class TrimblestreatsRoutingModule { }
