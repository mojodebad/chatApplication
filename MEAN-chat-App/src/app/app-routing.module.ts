import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatsComponent } from './chats/chats.component';


const routes: Routes = [
  {
   path:"login",
   component:AuthComponent
  },
  {
    path:"allRooms",
    component:ChatRoomComponent
  },
  {
    path:"chat",
    component:ChatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
