import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {  FirebaseListObservable } from 'angularfire2/database';
import {MemberdbService } from '../memberdb.service';
import {TasksService} from "../tasks.service";
import {AuthService } from "../auth.service";
declare  var $: any;
declare  var Materialize:any;

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  tasks : FirebaseListObservable<any[]>;
  updateTask: any;
  tsks:FirebaseListObservable<any>;

  constructor(private route: ActivatedRoute,
              private location:Location,
              private mdb: MemberdbService,
              private tsService: TasksService,
              private auth: AuthService) {
     this.route.params.subscribe(params=>{

      this.tasks = this.mdb.events(params["memberId"]);

    })

    this.updateTask={
      name:"unknown",
      finishDate:"unknown",
      content:"unknown",
      score:"0"
    };
    this.tsks = tsService.tasks as FirebaseListObservable<any>;

  }

  ngOnInit():void  {


    $(document).ready(function() {
      $('.modal').modal();

      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
      });
    })

  }

  goBack(): void {
    this.location.back();
  }

  openModal(task:any){
    this.updateTask = task;
    Materialize.updateTextFields();

    $('#updateEvent').modal('open');

  }
  saveInfor(){
    if ( this.auth.user.uid != this.updateTask.taskerId  && this.auth.profile.right !="power"){
      alert("您没有权力更新这则任务");
      return;
    }


    let finishDate = (<HTMLInputElement>document.getElementById("date")).value;
    this.updateTask.finishDate = finishDate;

    $('#updateEvent').modal('close');
    this.mdb.updateATask(this.updateTask.$key,this.updateTask.taskerId,this.updateTask);
  }

  selectEvent(event: string):void{
    this.updateTask.mainEventName = event;
  }




}
