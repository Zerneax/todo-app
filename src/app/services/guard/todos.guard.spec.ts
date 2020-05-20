import { TestBed } from '@angular/core/testing';

import { TodosGuard } from './todos.guard';

describe('TodosGuard', () => {
  let guard: TodosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TodosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
