import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isExpanded = false;

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
  }

  switchLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
