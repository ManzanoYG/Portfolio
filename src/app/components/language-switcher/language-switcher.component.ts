import { Component, HostListener, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Store} from "@ngrx/store";

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  currentLanguage = 'en';
  isMenuOpen = false;

 constructor(private store: Store, private translate: TranslateService, private elementRef: ElementRef) {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }
  }

  switchLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
    this.translate.use(languageCode);
    localStorage.setItem('language', languageCode);
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  getFlag(languageCode: string): string {
    const language = this.languages.find((lang) => lang.code === languageCode);
    return language ? language.flag : '';
  }
}
