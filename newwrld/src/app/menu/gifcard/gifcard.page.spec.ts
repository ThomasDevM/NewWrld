import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GifcardPage } from './gifcard.page';

describe('GifcardPage', () => {
  let component: GifcardPage;
  let fixture: ComponentFixture<GifcardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GifcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
