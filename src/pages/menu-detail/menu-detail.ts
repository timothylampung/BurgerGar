import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, Platform, ToastController, ViewController} from 'ionic-angular';
import {ItemMenuInterface} from "../../interface/menu-intem.interface";
import {CartProvider} from "../../providers/firebase/cart.provider";
import {CartInterface} from "../../interface/cart.interface";
import {AuthProvider} from "../../providers/firebase/auth.provider";
import {LoginPage} from "../login/login";


/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-user-detail',
  templateUrl: 'menu-detail.html',
})
export class MenuDetail {
  invalid:boolean=false;
  detail : ItemMenuInterface;
  newAccountNo :string='';

  newCart : CartInterface;
  user : any ;


  constructor(public toastCtrl: ToastController,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              public platform: Platform,
              private userService : AuthProvider,
              public cartProvider : CartProvider,
              public viewCtrl: ViewController,
              public navParams: NavParams) {

    this.detail = navParams.get('menuDetail');
    this.user = this.userService.getcurrentUser();

    this.user = this.userService.getcurrentUser();

    if(this.user==undefined){
      this.navCtrl.setRoot(LoginPage);
    }

  }


  showAlert() {
    let alert = this.alertCtrl.create({
      title: "",
      subTitle:'Fill quantity and choose flavor',
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity',
          type : 'number',
          min : '0',
          id : 'quantity',
        },
      ],
      buttons: [
        {
        text: 'SPICY',
        handler: data => {
          console.log(data.quantity)
          this.addToCart('spicy',data.quantity);
        }
      },

        {
        text: 'ORIGINAL',
        handler: data => {
          console.log('Original clicked');
          this.addToCart('original',data.quantity);
        }
      }]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
  }


  addToCart(flavor : string, quantity : number){

    console.log('poco')

    this.cartProvider.addToCart(
      {
        userId:this.user.uid,
        itemFlavour:flavor,
        itemName :this.detail.name,
        itemPrice:this.detail.price,
        quantity:quantity});

  }


  dismiss():void{
    this.viewCtrl.dismiss();
  }
}
