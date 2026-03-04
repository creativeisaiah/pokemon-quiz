import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizCompletePage } from './quiz-complete.page';

describe('QuizCompletePage', () => {
  let component: QuizCompletePage;
  let fixture: ComponentFixture<QuizCompletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
