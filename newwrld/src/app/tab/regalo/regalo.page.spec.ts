import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegaloPage } from './regalo.page';

describe('RegaloPage', () => {
  let component: RegaloPage;
  let fixture: ComponentFixture<RegaloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegaloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
