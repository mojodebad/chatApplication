import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { io } from "socket.io-client";
import { Chats } from '../Chats';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { of } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})

export class ChatsComponent implements OnInit {
  AllChats: Observable<Array<Chats>>;
  socket = io("http://localhost:3000");
  time: Date;
  message: String;
  user: string;
  chatroom: string;
  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.user = JSON.parse(sessionStorage.getItem("User")).data.Login._id;
    console.log(this.user);
    // this.AllChats=of(new Array<Chats>());
  }
 
  ngOnInit(): void {
    this.route.queryParams.subscribe(value => {
      console.log(value._id);
      this.chatroom = value._id;
      this.getAllChats(value._id);
    })
      
  
  }
  sendMessage() {
    // this.socket.emit("Newchat", "randi rona");
    // this.AllChats.push(new Chats(JSON.parse(sessionStorage.getItem("User")).data.Login.name, this.message, Date.now().toString(), JSON.parse(sessionStorage.getItem("User")).data.Login._id));
   
    let Args = `mutation{
           enterChat(chatdata:{
             chatroom:"${this.chatroom}"
             sender:"${this.user}"
             message:"${this.message}"
           })
    }`
    console.log(Args);

    this.authService.BackendPosts(Args).subscribe(result => {
      console.log(result);
      if(result=="err"){
     }
     else{
      this.AllChats.pipe(map(data => data.push(new Chats(JSON.parse(sessionStorage.getItem("User")).data.Login.name, this.message, Date.now().toString(), JSON.parse(sessionStorage.getItem("User")).data.Login._id,result.data.enterChat))
      )).subscribe(datas=>console.log(datas));
     }
    
    });
  }
  identifySender(sder) {
    console.log(sder);
    if (sder != this.user) {
      return 'Chats';
    }
    else {
      return 'senderChats';
    }
  }
  getAllChats(id) {
    let datum:Array<Chats>=[];
    let Args = `query{
      getAllChats(id:"${id}"){
        sender{
          name
          _id
        }
        message
        _id
      }
    }`;
    this.authService.BackendPosts(Args).subscribe(result => {
      // console.log(result.data.getAllChats);
      for (let i of result.data.getAllChats) {
        // this.AllChats.pipe(map(data=>{
        //   data.push();
        // }));
        datum.push(new Chats(i.sender.name, i.message, i.timestsmp, i.sender._id,i._id));
      }
    });
    this.AllChats=of(datum);
  }

  removeChat(data){
    console.log(data);
  let Args=`mutation{
    removeChat(id:"${data.Id}")
  }`;
  this.authService.BackendPosts(Args).subscribe(datam=>{
    console.log(datam);
    this.AllChats.pipe(map(chats=>{
      return chats.filter(d=>d.Id!=data.Id)})).subscribe((chats)=>{
       console.log("data deleted"+data);
      //  this.AllChats=of(chats);
    });
  });
  }  
 
}
