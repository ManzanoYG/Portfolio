import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit, OnDestroy {
  currentLang = 'en';
  education: any[] = [];
  experience: any[] = [];
  private langChangeSubscription?: Subscription;

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang() || 'en';
  }

  ngOnInit() {
    this.loadTranslatedData();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadTranslatedData();
    });
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private loadTranslatedData() {
    this.translate.get('education').subscribe((educationData: any[]) => {
      this.education = educationData || [];
    });

    this.translate.get('experience').subscribe((experienceData: any[]) => {
      this.experience = experienceData || [];
    });
  }
}
