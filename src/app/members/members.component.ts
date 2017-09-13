import { Component, OnInit } from '@angular/core';
import { MemberdbService } from '../memberdb.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AuthService} from '../auth.service';
import { TasksService } from '../tasks.service';
import { NgClass } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

declare var $:any;
declare var Materialize:any;

@Component({
  selector: 'members-list',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  selectDetailOfSomeone: any;
  event :any;
  members :FirebaseListObservable<any>;
  tsks :FirebaseListObservable<any>;
  scores: any;

  constructor(private ms :MemberdbService, public auth:AuthService, private tsk: TasksService, private router: Router ) {
    this.event = {};
    this.members = ms.members;
    this.tsks = tsk.tasks as FirebaseListObservable<any>;
    this.scores=[];

    this.members.subscribe((data)=>{
    let self = this;

  console.log(data);
    console.log(data);
      for (let d of data){
          this.scores[d.realName]=0;
          if (!d.activities)
            continue;
        Object.keys(d.activities).forEach(function(key) {
          self.scores[d.realName] =self.scores[d.realName]+ d.activities[key].score;
         });
          }
      console.log("2",this.scores);
    })

  }

  ngOnInit() {

    $(document).ready(function(){
      $('.modal').modal();


      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
      });
    });



  }


  selectEvent(event: string):void{
    this.event.mainEventName = event;
  }
  selectForDetail( c :any):void{
    this.selectDetailOfSomeone =c;

  }
  addEvent():void{


    this.event.taskerId = this.auth.user.uid;
    this.event.tasker = this.auth.profile.realName;
    this.event.status = "pending";
    let finishDate = (<HTMLInputElement>document.getElementById("date")).value;
    this.event.finishDate = finishDate;


    if (!this.event.mainEventName){

      Materialize.toast('选择关联活动或其他', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast

      return;
    }
    if (!this.event.score){
      Materialize.toast('预估给自己的分数', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast

      return;
    }

      this.ms.addEvent(this.event).then(data=>{
        this.event = {};
        $('#addEvent').modal('close');
      });


  }

  updateTasks():void{

    this.tsk.getTasksName();
  }
  goTaksDetail(uid){
    this.router.navigate(['/detail', uid ]);
  }

  approveEvent(memberProfile, taskId){
    this.ms.approveEvent(memberProfile, taskId);
  }

}
