import { TestBed } from '@angular/core/testing';

import { ImageStorageService } from './image-storage-service.service';

describe('ImageStorageServiceService', () => {
  let service: ImageStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
