import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDesarroPage } from './agregar-desarro.page';

describe('AgregarDesarroPage', () => {
  let component: AgregarDesarroPage;
  let fixture: ComponentFixture<AgregarDesarroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDesarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
