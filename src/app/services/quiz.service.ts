import { Injectable } from '@angular/core';
import { QuestionsService, Question } from './questions.service';

export type CompletedQuiz = {
  id: string;
  date: number;
  score: number;
  total: number;
  items: {
    questionId: number;
    question: string;
    options: string[];
    selectedIndex: number;
    correctIndex: number;
  }[];
};

@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly HISTORY_KEY = 'pokemon_quiz_history';
  private readonly LAST_COMPLETED_KEY = 'pokemon_quiz_last_completed_id';

  constructor(private readonly questionsService: QuestionsService) {}

  generateQuiz(count: number): Question[] {
  const all = this.questionsService.getAllQuestions();
  const safeCount = Math.min(count, all.length);

  const selected = [...all]
    .sort(() => Math.random() - 0.5)
    .slice(0, safeCount);

  return selected.map(q => this.shuffleQuestion(q));
}

private shuffleQuestion(question: Question): Question {
  const correctAnswer = question.options[question.answerIndex];

  const shuffledOptions = [...question.options]
    .sort(() => Math.random() - 0.5);

  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

  return {
    ...question,
    options: shuffledOptions,
    answerIndex: newCorrectIndex
  };
}

  saveCompletedQuiz(quiz: CompletedQuiz): void {
    const existing = this.getCompletedQuizzes();
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify([quiz, ...existing]));
    localStorage.setItem(this.LAST_COMPLETED_KEY, quiz.id);
  }

  getCompletedQuizzes(): CompletedQuiz[] {
    const raw = localStorage.getItem(this.HISTORY_KEY);
    return raw ? (JSON.parse(raw) as CompletedQuiz[]) : [];
  }

  getQuizById(id: string): CompletedQuiz | null {
    return this.getCompletedQuizzes().find(q => q.id === id) ?? null;
  }

  getLastCompletedQuizId(): string | null {
    return localStorage.getItem(this.LAST_COMPLETED_KEY);
  }

  clearHistory(): void {
    localStorage.removeItem(this.HISTORY_KEY);
    localStorage.removeItem(this.LAST_COMPLETED_KEY);
  }
}