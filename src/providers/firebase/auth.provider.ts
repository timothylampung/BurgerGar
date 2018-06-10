import { Injectable, } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  constructor(private af: AngularFireAuth) {
  } //Added injectors


  logout() {
    this.af.auth.signOut();
  }

  getcurrentUser():any{
    return this.af.auth.currentUser;
  }
}
