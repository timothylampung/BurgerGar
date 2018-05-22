
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {ItemMenuInterface} from "../../interface/menu-intem.interface";
import {Observable} from "rxjs/Observable";
import {UserInterface} from "../../interface/user.interface";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  userREF : AngularFireList<UserInterface>;

  users : Observable<UserInterface[]>;
  user : Observable<UserInterface>;

  userPath ='/users';

  constructor(public af :AngularFireDatabase) {

    this.userREF = this.af.list(this.userPath);
    this.users = this.userREF.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));

    });
  }


  //GET LIST OF MENUS TODO RETURN MENUS
  findMenus () :Observable<UserInterface[]>{
    return this.users;
  }

  //POST USER TODO write user
  newUser(user:UserInterface):void{
    this.userREF.push(user);
  }



  //GET one MENU TODO RETURN MENU


  //ADD MENU //TODO Admin

  //Update MENU //TODO Admin



}
