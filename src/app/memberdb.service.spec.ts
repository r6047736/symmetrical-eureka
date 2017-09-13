import { TestBed, inject } from '@angular/core/testing';

import { MemberdbService } from './memberdb.service';

describe('MemberdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberdbService]
    });
  });

  it('should be created', inject([MemberdbService], (service: MemberdbService) => {
    expect(service).toBeTruthy();
  }));
});
