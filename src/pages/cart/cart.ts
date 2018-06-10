import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/firebase/auth.provider";
import {CartProvider} from "../../providers/firebase/cart.provider";
import {Observable} from "rxjs/Observable";
import {CartInterface} from "../../interface/cart.interface";
import {LoginPage} from "../login/login";
import {MyOrderPage} from "../my-order/my-order";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  carts$ : Observable<CartInterface[]>;
  user : any;
  show:boolean = false;
  carts : any[] = [];
  address : string ='';
  contact : string='';
  name : string ='';
  date : string='';
  time : any='';

  constructor(public navCtrl: NavController,
              private auth : AuthProvider,
              public alertCtrl: AlertController,
              private cart : CartProvider,
              public navParams: NavParams) {

    this.user = this.auth.getcurrentUser();
    if(this.user == undefined){
      this.navCtrl.setRoot(LoginPage);
    }

    this.loadCarts();

  }


  loadCarts (){
    this.carts$ = this.cart.findCarts(this.user.uid);
    this.carts$
      .subscribe(x => {
        this.carts= x as any[];
      });
  }



  showDelivery (){
    this.show = true;

  }


  proceed(){


    if (this.show) {
      try {
        console.log(this.carts)
        this.cart.addToOrders(this.carts, this.user.uid, {contact: this.contact, address: this.address, name: this.name, date : this.date, time : this.time});
      } catch (e) {
      }
      finally {
        this.navCtrl.setRoot(MyOrderPage);

      }
    } else {

      try {
        console.log(this.carts)
        this.cart.addToOrders(this.carts, this.user.uid,{date : this.date, time : this.time});
      } catch (e) {
      }
      finally {
        this.navCtrl.setRoot(MyOrderPage);

      }
    }



  }

  //showAlert() {
  //  let alert = this.alertCtrl.create({
  //    title: "",
  //    subTitle:'Fill quantity and choose flavor',
  //
  //    buttons: [
  //      {
  //        text: 'SPICY',
  //        handler: data => {
  //          console.log(data.quantity)
  //        }
  //      },
  //
  //      {
  //        text: 'ORIGINAL',
  //        handler: data => {
  //          console.log('Original clicked');
  //        }
  //      }]
  //  });
  //  alert.present();
  //}

}
