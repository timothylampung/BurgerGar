
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {OrderInterface} from "../../interface/order.interface";


@Injectable()
export class OrderProvider{

  orderREF : AngularFireList<OrderInterface>;

  orders : Observable<OrderInterface[]>;
  order : OrderInterface;

  orderPath ='/orders';

  constructor(public af :AngularFireDatabase) {

    this.orderREF = this.af.list(this.orderPath);
    this.orders = this.orderREF.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));

    });
  }


  //GET LIST OF orders TODO RETURN orders
  findorders () :Observable<OrderInterface[]>{

    return this.orders;
  }

}
