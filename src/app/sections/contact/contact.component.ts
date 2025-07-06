import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  isSubmitting = false;
  successMessage = '';

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';

    // Simuler envoi (ex: API)
    setTimeout(() => {
      this.isSubmitting = false;
      this.successMessage = "Merci pour votre message, nous vous répondrons bientôt !";
    }, 2000);
  }

  currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
  }
}
