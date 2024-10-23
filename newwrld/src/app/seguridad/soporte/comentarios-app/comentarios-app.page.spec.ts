import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentariosAppPage } from './comentarios-app.page';

describe('ComentariosAppPage', () => {
  let component: ComentariosAppPage;
  let fixture: ComponentFixture<ComentariosAppPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
