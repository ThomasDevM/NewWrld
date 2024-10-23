import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleDesarroPage } from './detalle-desarro.page';

describe('DetalleDesarroPage', () => {
  let component: DetalleDesarroPage;
  let fixture: ComponentFixture<DetalleDesarroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDesarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
