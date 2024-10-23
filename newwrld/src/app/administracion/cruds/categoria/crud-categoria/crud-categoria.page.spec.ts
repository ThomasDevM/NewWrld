import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudCategoriaPage } from './crud-categoria.page';

describe('CrudCategoriaPage', () => {
  let component: CrudCategoriaPage;
  let fixture: ComponentFixture<CrudCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
