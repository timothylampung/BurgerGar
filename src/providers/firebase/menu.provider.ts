
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {ItemMenuInterface} from "../../interface/menu-intem.interface";
import {Observable} from "rxjs/Observable";


@Injectable()
export class MenuProvider {

  menuREF : AngularFireList<ItemMenuInterface>;

  menus : Observable<ItemMenuInterface[]>;
  menu : Observable<ItemMenuInterface>;

  menuPath ='/menu';

  constructor(public af :AngularFireDatabase) {

    this.menuREF = this.af.list(this.menuPath);
    this.menus = this.menuREF.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));

    });
  }


  //GET LIST OF MENUS TODO RETURN MENUS
  findMenus () :Observable<ItemMenuInterface[]>{
    return this.menus;
  }

  //GET one MENU TODO RETURN MENU


  //ADD MENU //TODO Admin

  //REMOVE MENU //TODO Admin

  //Update MENU //TODO Admin



}
