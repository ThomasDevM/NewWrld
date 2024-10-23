import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarDesarroPage } from './listar-desarro.page';

describe('ListarDesarroPage', () => {
  let component: ListarDesarroPage;
  let fixture: ComponentFixture<ListarDesarroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDesarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
