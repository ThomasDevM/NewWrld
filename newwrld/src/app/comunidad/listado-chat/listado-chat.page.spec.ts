import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoChatPage } from './listado-chat.page';

describe('ListadoChatPage', () => {
  let component: ListadoChatPage;
  let fixture: ComponentFixture<ListadoChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
