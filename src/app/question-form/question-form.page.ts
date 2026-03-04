// src/app/question-form/question-form.page.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonSelect,
  IonSelectOption,
  AlertController,
} from '@ionic/angular/standalone';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-question-form',
  standalone: true,
  templateUrl: './question-form.page.html',
  styleUrls: ['./question-form.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
    FormsModule,
    RouterLink,
  ],
})
export class QuestionFormPage implements OnInit {
  private readonly questionsService = inject(QuestionsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly alertCtrl = inject(AlertController);

  editId: string | null = null;
  isEdit = false;

  questionText = '';
  options = ['', '', '', ''];
  answerIndex = 0;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existing = this.questionsService.getQuestionById(id);
      if (existing) {
        this.editId = id;
        this.isEdit = true;
        this.questionText = existing.question;
        this.options = [...existing.options];
        this.answerIndex = existing.answerIndex;
      }
    }
  }

  updateOption(index: number, value: string): void {
    this.options[index] = value;
  }

  async save(): Promise<void> {
    if (!this.questionText.trim() || this.options.some(o => !o.trim())) {
      const alert = await this.alertCtrl.create({
        header: 'Missing Fields',
        message: 'Please fill in the question and all four options.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const data = {
      question: this.questionText.trim(),
      options: this.options.map(o => o.trim()),
      answerIndex: this.answerIndex,
    };

    if (this.isEdit && this.editId) {
      this.questionsService.updateQuestion(this.editId, data);
    } else {
      this.questionsService.addQuestion(data);
    }

    this.router.navigate(['/question-list']);
  }
}