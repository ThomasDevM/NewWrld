import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoBloqueadoPage } from './listado-bloqueado.page';

describe('ListadoBloqueadoPage', () => {
  let component: ListadoBloqueadoPage;
  let fixture: ComponentFixture<ListadoBloqueadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoBloqueadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
