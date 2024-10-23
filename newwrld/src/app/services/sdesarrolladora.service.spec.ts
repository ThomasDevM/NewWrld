import { TestBed } from '@angular/core/testing';

import { SdesarrolladoraService } from './sdesarrolladora.service';

describe('SdesarrolladoraService', () => {
  let service: SdesarrolladoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SdesarrolladoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
