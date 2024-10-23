import { TestBed } from '@angular/core/testing';

import { SnoticiaService } from './snoticia.service';

describe('SnoticiaService', () => {
  let service: SnoticiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnoticiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
