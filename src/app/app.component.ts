import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  public lightTheme: boolean = false;

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService
  ) {}

  async ngOnInit() {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      this.translate.use(storedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      const defaultLang = browserLang?.match(/en|fr/) ? browserLang : 'en';
      this.translate.use(defaultLang);
      localStorage.setItem('language', defaultLang);
    }
  }


  clickMenu(){
    this.lightTheme = !this.lightTheme;
    this.themeService.setTheme(this.lightTheme);

    Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, i, li, div, label, form, input, textarea, button')).forEach(element => {
        element.classList.toggle('dark-theme');
    });
  }
}
