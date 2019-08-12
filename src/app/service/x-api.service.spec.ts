import { TestBed } from '@angular/core/testing';

import { XApiService } from './x-api.service';

describe('XApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XApiService = TestBed.get(XApiService);
    expect(service).toBeTruthy();
  });
});
