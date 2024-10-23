import { TestBed } from '@angular/core/testing';

import { SCategoriaService } from './scategoria.service';

describe('SCategoriaService', () => {
  let service: SCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
