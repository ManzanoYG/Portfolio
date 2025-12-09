import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  public lightTheme: boolean = false;

  constructor(private translate: TranslateService) {
  }

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


    Array.from(document.getElementsByTagName('p')).forEach(element => {
        element.classList.toggle('dark-theme');
      });
    Array.from(document.getElementsByTagName('h3')).forEach(element => {
      element.classList.toggle('dark-theme');
    });
    Array.from(document.getElementsByTagName('a')).forEach(element => {
      element.classList.toggle('dark-theme');
    });
    Array.from(document.getElementsByTagName('span')).forEach(element => {
      element.classList.toggle('dark-theme');
    });
    Array.from(document.getElementsByTagName('i')).forEach(element => {
      element.classList.toggle('dark-theme');
    });
    Array.from(document.getElementsByTagName('li')).forEach(element => {
      element.classList.toggle('dark-theme');
    });
    Array.from(document.getElementsByTagName('div')).forEach(element => {
      element.classList.toggle('dark-theme');
    });
  }
}
