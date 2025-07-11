import {Component, HostListener} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isExpanded = false;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  closeSidebar() {
    this.isExpanded = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');

    if (
      window.innerWidth <= 768 &&
      sidebar &&
      toggleBtn &&
      !sidebar.contains(target) &&
      !toggleBtn.contains(target)
    ) {
      this.isExpanded = false;
    }
  }
}
