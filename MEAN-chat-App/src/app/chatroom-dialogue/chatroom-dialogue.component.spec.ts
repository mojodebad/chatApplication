import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomDialogueComponent } from './chatroom-dialogue.component';

describe('ChatroomDialogueComponent', () => {
  let component: ChatroomDialogueComponent;
  let fixture: ComponentFixture<ChatroomDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
