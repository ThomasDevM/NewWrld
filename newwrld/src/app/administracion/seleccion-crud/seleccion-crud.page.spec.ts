import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionCrudPage } from './seleccion-crud.page';

describe('SeleccionCrudPage', () => {
  let component: SeleccionCrudPage;
  let fixture: ComponentFixture<SeleccionCrudPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
