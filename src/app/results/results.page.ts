// src/app/results/results.page.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
} from '@ionic/angular/standalone';
import { QuizService, CompletedQuiz } from '../services/quiz.service';

@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    DatePipe,
    RouterLink,
  ],
})
export class ResultsPage {
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  quizzes: CompletedQuiz[] = this.quizService.getCompletedQuizzes();

  open(id: string): void {
    this.router.navigate(['/quiz-review', id]);
  }

  clear(): void {
    this.quizService.clearHistory();
    this.quizzes = [];
  }
}