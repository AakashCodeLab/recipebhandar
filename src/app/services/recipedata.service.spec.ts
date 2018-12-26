import { TestBed } from '@angular/core/testing';

import { RecipedataService } from './recipedata.service';

describe('RecipedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipedataService = TestBed.get(RecipedataService);
    expect(service).toBeTruthy();
  });
});
