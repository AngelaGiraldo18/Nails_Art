import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBootComponent } from './chat-boot.component';

describe('ChatBootComponent', () => {
  let component: ChatBootComponent;
  let fixture: ComponentFixture<ChatBootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatBootComponent]
    });
    fixture = TestBed.createComponent(ChatBootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
