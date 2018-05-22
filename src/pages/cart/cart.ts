import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider} from "../../providers/firebase/auth.provider";
import {CartProvider} from "../../providers/firebase/cart.provider";
import {Observable} from "rxjs/Observable";
import {CartInterface} from "../../interface/cart.interface";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  carts$ : Observable<CartInterface[]>;
  user : any;

  constructor(public navCtrl: NavController,
              private auth : AuthProvider,
              private cart : CartProvider,
              public navParams: NavParams) {

    this.user = this.auth.getcurrentUser();
    if(this.user == undefined){
      this.navCtrl.setRoot(LoginPage);
    }

    this.carts$ = this.cart.findCarts(this.user.uid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
