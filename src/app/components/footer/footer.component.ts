import { Component, Input } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  @Input() sidenavContent!: MatSidenavContent;

  constructor(private translate: TranslateService) {}

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    const scrollElement = this.sidenavContent?.getElementRef().nativeElement;
    
    if (element && scrollElement) {
      const yOffset = -64; // Toolbar height offset
      const y = element.offsetTop + yOffset;
      scrollElement.scrollTo({ top: y, behavior: 'smooth' });
    }
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
