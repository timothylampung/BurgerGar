import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {CartInterface} from "../../interface/cart.interface";
import {LoadingController} from 'ionic-angular';


@Injectable()
export class CartProvider {

  cartREF:AngularFireList<CartInterface>;

  carts:Observable<CartInterface[]>;
  cart:Observable<CartInterface>;

  cartPath = '/carts';
  ordersPath = '/orders';


     loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });



  constructor(public af:AngularFireDatabase,
              public loadingCtrl:LoadingController) {
  }


//GET LIST OF MENUS TODO RETURN MENUS
  findCarts(userId:string):Observable < CartInterface[] > {
    this.cartREF = this.af.list(this.cartPath + '/' + userId);
    this.carts = this.cartREF.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
    return this.carts;
  }

  addToCart(cart:any):void {
    this.af.list(this.cartPath + '/' + cart.userId).push(cart);
  }


  addToOrders(orders:any[], id, deliveryDetails ?):void {

    this.loader.present().catch(x=>{console.log(x)});
    this.af.list(this.ordersPath).set(id,
      {
        deliveryDetails: deliveryDetails,
        orders: orders
      }
    ).then(x=> {
      this.af.list(this.cartPath + '/' + id).remove().then(x=> {
        this.loader.dismissAll();
      }).catch(x=> {
      });
    });

  }


}
