import { Injectable, EventEmitter, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";
import { Platform } from 'ionic-angular';
import firebase, {User} from 'firebase';
import {UserInterface} from "../../interface/user.interface";

@Injectable()
export class AuthProvider {

  constructor(private af: AngularFireAuth, private platform: Platform) {
  } //Added injectors


  logout() {
    this.af.auth.signOut();
  }

  getcurrentUser():any{
    return this.af.auth.currentUser;
  }
}
