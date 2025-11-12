import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio';
  constructor(private translate: TranslateService) {
    // Langues disponibles
    translate.addLangs(['en', 'fr']);
    // Langue par défaut
    translate.setDefaultLang('fr');

    // Détection automatique du navigateur (optionnel)
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr/) ? browserLang : 'fr');
  }
}
