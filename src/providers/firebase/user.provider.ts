import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {UserInterface} from "../../interface/user.interface";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {User} from "firebase";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  userREF: AngularFireList<UserInterface>;
  userRef: AngularFireObject<UserInterface>;

  users: Observable<UserInterface[]>;
  user: FirebaseObjectObservable<UserInterface>;

  userPath = '/users';

  constructor(public af: AngularFireDatabase) {

    this.userREF = this.af.list(this.userPath);
    this.users = this.userREF.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));

    });
  }


  //GET LIST OF MENUS TODO RETURN MENUS
  findUsers(): Observable<UserInterface[]> {
    return this.users;
  }


  //POST USER TODO write user
  newUser(user: UserInterface): void {
    this.userREF.push(user);
  }
  //
  // thisUser(uid): Observable<UserInterface> {
  //   this.userRef = this.af.object(this.userPath + '/' + uid);
  //   this.user = this.userRef.valueChanges();
  //   return this.user;
  // }

  // Return a single observable item
  getItem(uid: string): FirebaseObjectObservable<UserInterface> {
    this.user = this.af.object(this.userPath+'/'+uid)
    return this.user
  }


  //GET one MENU TODO RETURN MENU


  //ADD MENU //TODO Admin

  //Update MENU //TODO Admin


}
