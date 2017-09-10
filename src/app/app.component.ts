import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable, Subscribable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AuthService} from './auth.service';
import {MembersComponent} from './members/members.component';
import {TasksService} from './tasks.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]

})
export class AppComponent {


  items :FirebaseListObservable<any>;
  user: firebase.User;
  userName : string="";
  userDep:string;
  userRealName:string;
  msgVal: string;


  constructor(public af:AngularFireDatabase, private authService : AuthService){
    this.items = af.list('/messages',{
      query:{
        limitToLast:5
      }
    })
    this.user = authService.user;


  }

  login(){
    this.authService.login();
  }
  logout(){
    this.authService.logout();
  }
  changeName(){
    if(!this.userName || !this.userDep || !this.userRealName)
    {
      alert("填写全部三项基础信息再提交")
      return;
    }

    this.authService.createAccount({
      name:this.userName,
      dep:this.userDep,
      realName:this.userRealName,
      id: this.authService.user.uid
    })
  }

  chatSend(message: string){
    this.items.push({message:message, name: this.authService.user.displayName});
    this.msgVal = '';
    console.log(this.items);
}




}
