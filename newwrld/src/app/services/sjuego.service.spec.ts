import { TestBed } from '@angular/core/testing';

import { SJuegoService } from './sjuego.service';

describe('SJuegoService', () => {
  let service: SJuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SJuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
