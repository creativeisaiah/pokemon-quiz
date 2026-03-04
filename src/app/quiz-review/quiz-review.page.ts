import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonButton,
} from '@ionic/angular/standalone';
import { QuizService, CompletedQuiz } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-review',
  standalone: true,
  templateUrl: './quiz-review.page.html',
  styleUrls: ['./quiz-review.page.scss'],
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
export class QuizReviewPage {
  private readonly route = inject(ActivatedRoute);
  private readonly quizService = inject(QuizService);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly quiz: CompletedQuiz | null = this.id ? this.quizService.getQuizById(this.id) : null;

  isCorrect(selected: number, correct: number): boolean {
    return selected === correct;
  }
}