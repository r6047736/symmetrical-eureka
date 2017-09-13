import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.css']
})
export class FloatButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }
  awaitTask():void{
    this.auth.awaitTask();
  }


}
