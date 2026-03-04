import { Component, inject, signal } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
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
  IonProgressBar,
} from '@ionic/angular/standalone';
import { QuizService } from '../services/quiz.service';
import type { Question } from '../services/questions.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonProgressBar,
    RouterLink,
  ],
})
export class QuizPage implements ViewWillEnter {
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  ionViewWillEnter(): void {
    (this as any).questions = this.quizService.generateQuiz(10);
    this.index.set(0);
    this.answers.set([]);
  }

  questions: Question[] = this.quizService.generateQuiz(10);

  readonly index = signal(0);
  readonly answers = signal<number[]>([]);

  get total(): number {
    return this.questions.length;
  }

  get current(): Question {
    return this.questions[this.index()];
  }

  get progress(): number {
    return this.total === 0 ? 0 : this.index() / this.total;
  }

  select(optionIndex: number): void {
    this.answers.update(a => [...a, optionIndex]);

    if (this.index() < this.total - 1) {
      this.index.update(i => i + 1);
      return;
    }

    this.complete();
  }

  private complete(): void {
    const answers = this.answers();
    const score = answers.reduce((acc, selected, i) => {
      return acc + (selected === this.questions[i].answerIndex ? 1 : 0);
    }, 0);

    const completed = {
      id: crypto.randomUUID(),
      date: Date.now(),
      score,
      total: this.total,
      items: this.questions.map((q, i) => ({
        questionId: q.id,
        question: q.question,
        options: q.options,
        selectedIndex: answers[i],
        correctIndex: q.answerIndex,
      })),
    };

    this.quizService.saveCompletedQuiz(completed);
    this.router.navigate(['/quiz-complete']);
  }
}