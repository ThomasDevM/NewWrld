import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAmigoPage } from './listado-amigo.page';

describe('ListadoAmigoPage', () => {
  let component: ListadoAmigoPage;
  let fixture: ComponentFixture<ListadoAmigoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAmigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
