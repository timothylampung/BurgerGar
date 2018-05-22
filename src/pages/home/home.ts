import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {MenuProvider} from "../../providers/firebase/menu.provider";
import {Observable} from "rxjs/Observable";
import {ItemMenuInterface} from "../../interface/menu-intem.interface";
import {AngularFireList} from "angularfire2/database";
import {MenuDetail} from "../menu-detail/menu-detail";
import {AuthProvider} from "../../providers/firebase/auth.provider";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  menus$ : Observable<ItemMenuInterface[]>;

  user : any;

  constructor(public navCtrl: NavController,
              private auth : AuthProvider,
              public modalCtrl: ModalController,
              private menuProvider : MenuProvider) {

    this.menus$ =  this.menuProvider.findMenus();
    this.user = this.auth.getcurrentUser();

    if(this.user==undefined){
      this.navCtrl.setRoot(LoginPage);
    }
  }

  openModal(x : ItemMenuInterface) {
    let modal = this.modalCtrl.create(MenuDetail, {menuDetail:x});
    modal.onDidDismiss(() => {
    });
    modal.present({
    });
  }

}
