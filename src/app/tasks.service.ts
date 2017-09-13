import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class TasksService {

  tasks : FirebaseListObservable<any>;
  onlyTasksName: string[];


  constructor(private auth: AuthService, private af:AngularFireDatabase) {

    this.tasks = af.list("event");
    af.list("event").subscribe((data)=>{
      this.onlyTasksName = [];
      data.forEach(key=>{
        this.onlyTasksName.push(key.name);
      })

      console.log(this.onlyTasksName);
    })


  }

  getTasksName(): string[]{
    console.log(this.onlyTasksName);
    return this.onlyTasksName;
  }

}
