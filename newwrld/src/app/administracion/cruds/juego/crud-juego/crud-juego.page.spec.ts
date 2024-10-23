import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudJuegoPage } from './crud-juego.page';

describe('CrudJuegoPage', () => {
  let component: CrudJuegoPage;
  let fixture: ComponentFixture<CrudJuegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
