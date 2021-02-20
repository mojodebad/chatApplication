import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chatroom-dialogue',
  templateUrl: './chatroom-dialogue.component.html',
  styleUrls: ['./chatroom-dialogue.component.css']
})
export class ChatroomDialogueComponent implements OnInit ,OnChanges{

  constructor(private dialogref:MatDialogRef<ChatroomDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
    
  }

  ngOnInit(): void {
    
  }
  onNoClick(){
    this.dialogref.close();
  }
}
