import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPendientePage } from './solicitud-pendiente.page';

describe('SolicitudPendientePage', () => {
  let component: SolicitudPendientePage;
  let fixture: ComponentFixture<SolicitudPendientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudPendientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
