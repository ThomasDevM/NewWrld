import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidalaPage } from './olvidala.page';

describe('OlvidalaPage', () => {
  let component: OlvidalaPage;
  let fixture: ComponentFixture<OlvidalaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
