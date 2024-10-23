import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoNoticiaPage } from './listado-noticia.page';

describe('ListadoNoticiaPage', () => {
  let component: ListadoNoticiaPage;
  let fixture: ComponentFixture<ListadoNoticiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoNoticiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
