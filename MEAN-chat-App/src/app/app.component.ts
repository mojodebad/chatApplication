import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN-chat-App';
 mode:String;
 showFiller:boolean;
 
  constructor(private router:Router){
    this.showFiller=false;
  }
  ngOnInit(){
   this.router.navigate(["login"]);
   this.mode="over";
   
  }
  goToAllChats(){
      this.router.navigateByUrl("allRooms")
  }
}
