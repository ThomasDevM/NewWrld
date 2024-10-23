import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirAmigoPage } from './anadir-amigo.page';

describe('AnadirAmigoPage', () => {
  let component: AnadirAmigoPage;
  let fixture: ComponentFixture<AnadirAmigoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirAmigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
