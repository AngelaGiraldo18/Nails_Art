import { TestBed } from '@angular/core/testing';

import { UsuarioSharedServiceService } from './usuario-shared-service.service';

describe('UsuarioSharedServiceService', () => {
  let service: UsuarioSharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioSharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
