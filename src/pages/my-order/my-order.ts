import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {OrderInterface} from "../../interface/order.interface";
import {AuthProvider} from "../../providers/firebase/auth.provider";
import {OrderProvider} from "../../providers/firebase/order.provider";
import {LoginPage} from "../login/login";

/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {

  orders$ : Observable<OrderInterface[]>;
  orders : OrderInterface[] = [];
  user : any;


  constructor(public navCtrl: NavController,
              private auth : AuthProvider,
              public alertCtrl: AlertController,
              public orderProvider : OrderProvider,
              public navParams: NavParams) {

    this.user = this.auth.getcurrentUser();
    if(this.user == undefined){
      this.navCtrl.setRoot(LoginPage);
    }
    this.loadOrders();
  }


  loadOrders (){
    this.orders$ = this.orderProvider.findorders();
    this.orders$.subscribe(x=>{
      this.orders = x as OrderInterface[];
      console.log(x)
    });

  }





}
