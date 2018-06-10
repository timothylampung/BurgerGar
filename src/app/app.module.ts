import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {MenuProvider} from "../providers/firebase/menu.provider";
import {HttpClientModule} from "@angular/common/http";
import {MenuDetail} from "../pages/menu-detail/menu-detail";
import {AngularFireAuthModule} from "angularfire2/auth";
import {LoginPage} from "../pages/login/login";
import {UserProvider} from "../providers/firebase/user.provider";
import {AuthProvider} from "../providers/firebase/auth.provider";
import {CartProvider} from "../providers/firebase/cart.provider";
import {CartPage} from "../pages/cart/cart";
import {MyOrderPage} from "../pages/my-order/my-order";
import {OrderProvider} from "../providers/firebase/order.provider";
import {AdministratorPage} from "../pages/administrator/administrator";


export const firebaseConfig={
  apiKey: "AIzaSyBSmdHnVv9ZOoTQyPuaEWnkHz9vFqvYWSI",
  authDomain: "hasrol-burgersystem.firebaseapp.com",
  databaseURL: "https://hasrol-burgersystem.firebaseio.com",
  projectId: "hasrol-burgersystem",
  storageBucket: "hasrol-burgersystem.appspot.com",
  messagingSenderId: "224788241847"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuDetail,
    LoginPage,
    CartPage,
    MyOrderPage,
    AdministratorPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuDetail,
    LoginPage,
    CartPage,
    MyOrderPage,
    AdministratorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuProvider, UserProvider,AuthProvider,CartProvider, OrderProvider
  ]
})
export class AppModule {}
