
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {CartInterface} from "../../interface/cart.interface";



@Injectable()
export class CartProvider {

  cartREF : AngularFireList<CartInterface>;

  carts : Observable<CartInterface[]>;
  cart : Observable<CartInterface>;

  cartPath ='/carts';

  constructor(public af :AngularFireDatabase) {


  }


  //GET LIST OF MENUS TODO RETURN MENUS
  findCarts (userId : string) :Observable<CartInterface[]>{
    this.cartREF = this.af.list(this.cartPath+'/'+userId);
    this.carts = this.cartREF.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    return this.carts;
  }

  addToCart(cart:any):void{
    this.af.list(this.cartPath+'/'+cart.userId).push(cart);
  }
  //GET one MENU TODO RETURN MENU


  //ADD MENU //TODO Admin

  //REMOVE MENU //TODO Admin

  //Update MENU //TODO Admin



}
