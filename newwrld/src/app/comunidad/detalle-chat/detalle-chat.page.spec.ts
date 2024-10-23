import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleChatPage } from './detalle-chat.page';

describe('DetalleChatPage', () => {
  let component: DetalleChatPage;
  let fixture: ComponentFixture<DetalleChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
