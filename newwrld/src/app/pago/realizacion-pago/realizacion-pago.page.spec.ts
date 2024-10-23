import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealizacionPagoPage } from './realizacion-pago.page';

describe('RealizacionPagoPage', () => {
  let component: RealizacionPagoPage;
  let fixture: ComponentFixture<RealizacionPagoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizacionPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
