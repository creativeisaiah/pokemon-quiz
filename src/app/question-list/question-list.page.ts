// src/app/question-list/question-list.page.ts
import { Component, inject } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  AlertController,
} from '@ionic/angular/standalone';
import { QuestionsService, Question } from '../services/questions.service';

@Component({
  selector: 'app-question-list',
  standalone: true,
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    RouterLink,
  ],
})
export class QuestionListPage implements ViewWillEnter {
  private readonly questionsService = inject(QuestionsService);
  private readonly alertCtrl = inject(AlertController);

  questions: Question[] = [];

  ionViewWillEnter(): void {
    this.questions = this.questionsService.getAllQuestions();
  }

  async confirmDelete(q: Question): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Delete Question',
      message: `Are you sure you want to delete "${q.question}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.questionsService.deleteQuestion(q.id);
            this.questions = this.questionsService.getAllQuestions();
          },
        },
      ],
    });
    await alert.present();
  }
}