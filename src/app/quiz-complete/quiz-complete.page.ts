import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-complete',
  standalone: true,
  templateUrl: './quiz-complete.page.html',
  styleUrls: ['./quiz-complete.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    RouterLink,
    DatePipe,
  ],
})
export class QuizCompletePage {
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  readonly lastId = this.quizService.getLastCompletedQuizId();
  readonly lastQuiz = this.lastId ? this.quizService.getQuizById(this.lastId) : null;

  review(): void {
    if (!this.lastId) return;
    this.router.navigate(['/quiz-review', this.lastId]);
  }
}