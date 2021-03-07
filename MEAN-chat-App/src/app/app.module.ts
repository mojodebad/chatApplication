import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle"
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { ChatsComponent } from './chats/chats.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatroomDialogueComponent } from './chatroom-dialogue/chatroom-dialogue.component';
import {MatDialogModule} from "@angular/material/dialog"
import {APOLLO_OPTIONS} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";
@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    AuthComponent,
    ChatsComponent,
    ChatRoomComponent,
    ChatroomDialogueComponent
  ],
  imports: [
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule
  ],
  providers: [
    {provide:APOLLO_OPTIONS,
    useFactory:(httpLink:HttpLink)=>{
      return{
        cache:new InMemoryCache(),
        link:httpLink.create({
          uri:"api/"
        })
      }
    },
  deps:[HttpLink]
  }
  ],
  entryComponents:[ChatroomDialogueComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
