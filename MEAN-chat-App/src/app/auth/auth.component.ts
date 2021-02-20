import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login:boolean;
  email:String;
  name:String;
  password:String;
  confirmPassword:String;
  mobile:String;
  err:string;
  constructor(private router:Router,private authService:AuthService) { 
    this.login=true;
    this.err="";
  }

  ngOnInit(): void {
  }
  goToAllChats(){
    this.router.navigateByUrl("allRooms");  
}
signUp(){
  console.log("beliver");
  let Args=`mutation{Signup(user:{
    name:"${this.name}",
    email:"${this.email}",
    password:"${this.password}",
    confirmPassword:"${this.confirmPassword}",
    mobile:"${this.mobile}"}){ name _id email mobile}}`;
    this.authService.BackendPosts(Args).subscribe(res=>{
      console.log(res);
      this.login=false
    });
}
Login(){
if(this.email==null||this.password==null){
   this.err="email and password must be present";
}
else{
  this.err="";
  let Args=`query{Login(user:{
    email:"${this.email}",
    password:"${this.password}"
  }){name _id email }}`
  this.authService.BackendPosts(Args).subscribe(res=>{
    console.log(res);
    sessionStorage.setItem("loggedIn","true");
    sessionStorage.setItem("User",JSON.stringify(res));
    this.router.navigate(["allRooms"]);
  })
}
 
}
}
