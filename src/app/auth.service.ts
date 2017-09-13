import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable, Subscribable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public user : firebase.User;
  public profile: any ={
    name:'',
  }

  constructor(public afAuth: AngularFireAuth, public af:AngularFireDatabase ) {



     afAuth.authState.subscribe((auth)=>{
      if (auth != null)
      {
        this.user    = auth;

        af.object("/profile/"+this.user.uid).subscribe((data)=>{
          if (data){
            console.log(data	);
            this.profile = data;
          }

        })
      }
      else{
            this.user = null;
            this.profile ={
              name:'',
            }
      }

    })
  }

  loginFB() :void{
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())

  }
  loginEmail(email,password):void{
    this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }
  logout(): void {
    this.afAuth.auth.signOut();
  }

  createAccountByEmail(email,password):firebase.Promise<any>{
      return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  createAccount( userObj :Object):void {
    this.af.list("/profile/").set(this.user.uid,userObj).then((data)=>{
      alert("register successfully");
    });
    this.af.list("/members/").set(this.user.uid,userObj).then((data)=>{
    });



  }
  awaitTask():void{
      if (this.user && !this.profile.notask ){
        this.af.list("/profile/").update(this.user.uid,{notask:true}).then((data)=>{
        });
        this.af.list("/members/").update(this.user.uid,{notask:true}).then((data)=>{
        });
      }
      else{
        this.af.list("/profile/").update(this.user.uid,{notask:false}).then((data)=>{
        });
        this.af.list("/members/").update(this.user.uid,{notask:false}).then((data)=>{
        });
      }
  }





}
