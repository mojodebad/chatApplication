import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import  {io} from "socket.io-client";

import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ChatroomDialogueComponent } from '../chatroom-dialogue/chatroom-dialogue.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  data:Observable<Array<any>>=of([]);
  socket=io("http://localhost:3000");
  chatRoom:string="";
  currentUser:any;
  constructor(public dialog: MatDialog,private router:Router,private authService:AuthService) { 
  }

  openDialogue(){
    const createChroom=this.dialog.open(ChatroomDialogueComponent,{
      width:'250px',
      data:""
    });
    createChroom.afterClosed().subscribe(result=>{
      // console.log(result);

        this.createChatRoom(JSON.parse(sessionStorage.getItem("User")),result);
    });
   
  }
  ngOnInit(): void {
    this.getAllChatRoom();
    this.currentUser=JSON.parse(sessionStorage.getItem("User")).data.Login._id;
    this.socket.on("created ChatRoom",(Args)=>{
      console.log(Args);
    })
  }
  getAllChatRoom(){
    let Args=`query{
      getAllChatRoom{
        name 
        _id
        creator{
          name
          _id
          password
        }
      }
    }`;
    this.authService.BackendPosts(Args).subscribe(res=>{
      // this.data.push(...res.data.getAllChatRoom);
      console.log(res.data.getAllChatRoom);
      this.data=of(res.data.getAllChatRoom)
      // this.data.pipe(map(datum=>datum=res.data.getAllChatRoom),tap(dam=>console.log(dam)));
    });
  }
  openChat(_id){
    this.router.navigate(["chat"],{"queryParams":{
      "_id":_id
    }});
  }
  createChatRoom(user,Chatroom){
    console.log(user.data.Login,Chatroom);
    if(Chatroom!=undefined||Chatroom!=null)
    {const Args=`
    mutation{
     createChatRoom(croom:{ name:"${Chatroom}", creator:"${user.data.Login._id.toString()}"}){
       _id name creator{
         name _id email
       } 
     }   
   }`
   this.authService.BackendPosts(Args).subscribe(result=>{
     console.log(result);
    //  this.data.push(result.data.createChatRoom);
    this.data.pipe(map(datam=>datam.push(result.data.createChatRoom)))
   });}
   this.socket.on("created Chatroom",(args)=>{
     console.log(args);
   })
  }
  deleteChatroom(dats){
    const Args=`mutation{
      removeChatRoom(id:"${dats._id}")
    }`
    if(dats.creator._id==JSON.parse(sessionStorage.getItem("User")).data.Login._id){
    this.authService.BackendPosts(Args).subscribe(result=>{ 
      if(result.data){
         this.data.pipe(map(datum=>{
           datum.splice(datum.findIndex(d=>d._id==dats._id));
         }));
      }
    });
   }
  }
}
