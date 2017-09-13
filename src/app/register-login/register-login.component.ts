import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

declare  var $ :any;
@Component({
  selector: 'register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  newAccount:any;
  login:any;
  createProfile:any;


  constructor(public auth:AuthService ) {
    this.newAccount ={};
    this.login={};
    this.createProfile={}

  }

  ngOnInit() {
    $(document).ready(function() {
      $('select').material_select();
    });

  }



  registerEmail():void{
    if ( this.newAccount.email &&
          this.newAccount.password &&
        this.newAccount.repeatPassword &&
      ( this.newAccount.password ==  this.newAccount.repeatPassword)
    ){
      this.auth.createAccountByEmail(this.newAccount.email, this.newAccount.password );
    }
  }

  selectDep(dep:string):void{
    this.createProfile.dep= dep;

  }

  loginWithEmail():void{
    this.auth.loginEmail(this.login.email,this.login.password);
  }

  loginWithFacebook():void{
    this.auth.loginFB();
  }

  createProfileFn():void{
    if(!this.createProfile.realName || !this.createProfile.dep)
    {
      alert("请填写正确姓名和所属部门")
      return;
    }

    this.auth.createAccount({
      dep:this.createProfile.dep,
      realName:this.createProfile.realName,
      id: this.auth.user.uid
    })
  }



}
