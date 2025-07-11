import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  calculatedAge: number = 0;
  currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
  }

  ngOnInit() {
    this.calculateAge();
  }
  private calculateAge() {
    const birthDate = new Date('2000-04-21');
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.calculatedAge = age;
  }

  downloadCV() {
    // Pour l'instant, ouvrir le CV dans un nouvel onglet
    // Plus tard, vous pourrez ajouter le lien vers votre CV
    window.open('assets/cv/CV_Mathis_Langlois.pdf', '_blank');
  }
}
