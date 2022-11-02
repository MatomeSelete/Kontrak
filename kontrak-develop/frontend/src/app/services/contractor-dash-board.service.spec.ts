import { TestBed } from '@angular/core/testing';

import { ContractorDashBoardService } from './contractor-dash-board.service';

describe('ContractorDashBoardService', () => {
  let service: ContractorDashBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorDashBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
