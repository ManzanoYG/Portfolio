import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  birthDate: Date = new Date(2000, 3, 21);
  showLinkedInText = false;
  showGitHubText = false;
  showDownloadText = false;

  constructor(private translate: TranslateService) {}

  public getAge(): any {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDifference = today.getMonth() - this.birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public downloadCV(): void {
    const currentLang = this.translate.currentLang || 'en';
    const cvFiles: { [key: string]: string } = {
      'en': 'assets/cv/Curriculum Vitæ Manzano Y Gonzalez Mathias_EN.pdf',
      'fr': 'assets/cv/Curriculum Vitæ Manzano Y Gonzalez Mathias_FR.pdf'
    };
    
    const cvPath = cvFiles[currentLang] || cvFiles['en'];
    
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = `CV_Mathias_Manzano_${currentLang.toUpperCase()}.pdf`;
    link.click();
  }
}
