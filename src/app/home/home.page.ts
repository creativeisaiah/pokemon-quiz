import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon
} from '@ionic/angular/standalone';

import { logoLinkedin, logoGithub } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    RouterLink,
],
})
export class HomePage {
  constructor() {
    addIcons({
      logoLinkedin,
      logoGithub
    });
  }
}