// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'quiz',
    loadComponent: () => import('./quiz/quiz.page').then((m) => m.QuizPage),
  },
  {
    path: 'quiz-complete',
    loadComponent: () =>
      import('./quiz-complete/quiz-complete.page').then((m) => m.QuizCompletePage),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./results/results.page').then((m) => m.ResultsPage),
  },
  {
    path: 'quiz-review/:id',
    loadComponent: () =>
      import('./quiz-review/quiz-review.page').then((m) => m.QuizReviewPage),
  },
];