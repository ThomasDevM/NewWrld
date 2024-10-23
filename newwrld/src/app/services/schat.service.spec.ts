import { TestBed } from '@angular/core/testing';

import { SchatService } from './schat.service';

describe('SchatService', () => {
  let service: SchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
