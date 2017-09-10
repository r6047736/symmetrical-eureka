import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";


import {AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';



import { AuthService } from "./auth.service";
import { MemberdbService } from './memberdb.service';
import { TasksService } from './tasks.service';

import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { KeysPipe } from './keys.pipe';


export const firebaseConfig = {
  apiKey: "AIzaSyBCFVyZG3tV1AKr1pcYaWL9TduR7me7eRs",
  authDomain: "acss-manage.firebaseapp.com",
  databaseURL: "https://acss-manage.firebaseio.com",
  projectId: "acss-manage",
  storageBucket: "acss-manage.appspot.com",
  messagingSenderId: "311428748565"
};


@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule

  ],
  providers: [AuthService,MemberdbService,TasksService],
  bootstrap: [AppComponent]
})


export class AppModule { }
