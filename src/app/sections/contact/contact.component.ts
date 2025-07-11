import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  isSubmitting = false;
  successMessage = '';
  currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.translate.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      // Mettre à jour le message de succès uniquement s'il est déjà affiché
      if (this.successMessage) {
        this.updateSuccessMessage();
      }
    });
  }

  ngOnInit(): void {
    // Animation d'entrée pour les éléments décoratifs
    this.animateDecorations();
    // S'assurer que le message de succès est vide au départ
    this.successMessage = '';
  }

  animateDecorations(): void {
    // Cette méthode pourrait être utilisée pour des animations avancées 
    // si on voulait déclencher des animations en JavaScript
  }

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';

    // Simuler un délai d'envoi (à remplacer par un vrai appel API)
    setTimeout(() => {
      this.isSubmitting = false;
      this.updateSuccessMessage();
    }, 2000);
  }

  private updateSuccessMessage(): void {
    // Message de réussite traduit selon la langue actuelle
    if (this.currentLang === 'fr') {
      this.successMessage = "Merci pour votre message ! Je vous répondrai dès que possible.";
    } else {
      this.successMessage = "Thank you for your message! I will respond as soon as possible.";
    }
  }
}
