import { TestBed } from '@angular/core/testing';

import { AuthUsersService } from './authUsers.service';

describe('UsersService', () => {
  let service: AuthUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
