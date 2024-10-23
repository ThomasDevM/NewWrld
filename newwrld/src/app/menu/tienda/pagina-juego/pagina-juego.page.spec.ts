import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaJuegoPage } from './pagina-juego.page';

describe('PaginaJuegoPage', () => {
  let component: PaginaJuegoPage;
  let fixture: ComponentFixture<PaginaJuegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
