import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable, Subscribable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AuthService} from './auth.service';
import "rxjs/add/operator/map";
import {MembersComponent} from './members/members.component';
import {TasksService} from './tasks.service';
declare var $:any;



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


  constructor(public af:AngularFireDatabase, public authService : AuthService){



    this.items = af.list('/messages',{
      query:{
        limitToLast:5
      }
    });

    this.user = authService.user;


    }

  ngOnInit() {
    $(document).ready(function() {
      $('select').material_select();
    });

  }



  changeName(){

  }

  chatSend(message: string){
    this.items.push({message:message, name: this.authService.profile.realName});
    this.msgVal = '';
    console.log(this.items);
}




}
