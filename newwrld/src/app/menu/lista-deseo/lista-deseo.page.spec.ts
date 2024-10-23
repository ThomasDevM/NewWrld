import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaDeseoPage } from './lista-deseo.page';

describe('ListaDeseoPage', () => {
  let component: ListaDeseoPage;
  let fixture: ComponentFixture<ListaDeseoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeseoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
