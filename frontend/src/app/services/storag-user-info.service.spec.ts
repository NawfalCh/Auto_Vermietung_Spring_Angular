import { TestBed } from '@angular/core/testing';

import { StoragUserInfoService } from './storag-user-info.service';

describe('StoragUserInfoService', () => {
  let service: StoragUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoragUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
