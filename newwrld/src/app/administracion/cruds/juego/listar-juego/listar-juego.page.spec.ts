import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarJuegoPage } from './listar-juego.page';

describe('ListarJuegoPage', () => {
  let component: ListarJuegoPage;
  let fixture: ComponentFixture<ListarJuegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
