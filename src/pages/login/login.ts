import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {UserProvider} from "../../providers/firebase/user.provider";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class  LoginPage {

  message : string;
  isError :boolean= false;
  isLoad : boolean =false;
  authState: any = null;

  email :string='';
  password:string='';


  constructor(private afAuth: AngularFireAuth,
              public loadingCtrl: LoadingController,
              private userProvider : UserProvider,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }


  //// Email/Password Auth ////
  emailSignUp() {
    this.isLoad = true;
    this.presentLoading();
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.userProvider.newUser({email : this.email})
        this.isLoad = false;
        this.authState = user;
      })
      .catch(error => {
        this.isLoad = false;
        console.log(error);
        this.isError =true;
        this.message = error.message;
      });
  }

  emailLogin(){
    this.isLoad = true;
    this.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.isLoad = false;
        this.authState = user;
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error )=> {
        this.isLoad = false;
        console.log(error);
        this.isError =true;
        this.message = error.message;
      });
  }

}
