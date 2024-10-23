import { TestBed } from '@angular/core/testing';

import { SlistaDeseoService } from './slista-deseo.service';

describe('SlistaDeseoService', () => {
  let service: SlistaDeseoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlistaDeseoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
