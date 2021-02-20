import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';

export class Chats{
    Id:string;
    sender:string;
    message:string;
    timeStamp:string;
    senderID:string
    constructor(sender,message,time,_id,id?){
      this.sender=sender;
      this.message=message;
      this.timeStamp=time;
      this.senderID=_id;
      this.Id=id?id:"";
    }
  }