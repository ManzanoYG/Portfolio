import {Component, EventEmitter, Input, Output, OnInit, HostListener, OnDestroy} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() isExpanded = false;
  @Output() closeSidebar = new EventEmitter<void>();
  
  activeSection = 'home';
  currentLang = 'en';
  private scrollTimeout: any;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
  }

  ngOnInit() {
    // Délai pour que les éléments soient chargés
    setTimeout(() => {
      this.updateActiveSection();
    }, 100);
  }

  ngOnDestroy() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Debounce pour les performances
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      this.updateActiveSection();
    }, 10);
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Mise à jour immédiate de la section active
      this.activeSection = elementId;
      
      // Fermer la sidebar sur mobile après le clic
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          this.closeSidebar.emit();
        }, 300); // Délai pour permettre l'animation de scroll
      }
    }
  }

  private updateActiveSection(): void {
    const sections = ['home', 'about', 'experience', 'skills', 'portfolio', 'contact-form'];
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Si on est tout en haut, c'est home
    if (scrollPosition < 100) {
      this.activeSection = 'home';
      return;
    }
    
    // Si on est tout en bas, c'est contact
    if (scrollPosition + windowHeight >= documentHeight - 50) {
      this.activeSection = 'contact-form';
      return;
    }

    // Trouve la section actuellement visible
    let currentSection = 'home';
    let minDistance = Infinity;

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionCenter = sectionTop + (rect.height / 2);
        const viewportCenter = scrollPosition + (windowHeight / 2);
        
        const distance = Math.abs(sectionCenter - viewportCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = sectionId;
        }
      }
    }

    this.activeSection = currentSection;
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  switchLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
