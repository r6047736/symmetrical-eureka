import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {Observable, Subscribable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MemberdbService {

  public members :FirebaseListObservable<any>;



  constructor(private af: AngularFireDatabase,private afAuth: AuthService) {
    this.members = af.list("members")

  }





  addEvent(Obj){
    let promise = new Promise((resolve, reject) => {
      if (!this.afAuth.user){
        reject()
      }
      this.af.list("members/"+this.afAuth.user.uid+"/activities").push(Obj).then((data)=>{
        resolve();
      })
    })
    return promise;
  }
  events(memberId):FirebaseListObservable<any[]>{
    return this.af.list("members/"+memberId+"/activities")
  }

  updateATask(taskId:string, uid:string, updateTask:any):void{
      this.af.list("members/"+uid+"/activities/").update(taskId,updateTask);
  }

  updateEvent():void{

  }
  deleteEvent():void{

  }
  approveEvent( approveeProfile, taskId):void{
    if (!taskId){
      alert("task id is null");
      return;
    }
    if (this.afAuth.profile.right=="power"){
      this.af.list("members/"+approveeProfile.id+"/activities/"+taskId).set("status","approval").then((err)=>{

        if (err){
          alert("审核出错")
          console.log(err);
        }

      });
    }
    else{
      alert("没有权限审核")
    }

  }





}
