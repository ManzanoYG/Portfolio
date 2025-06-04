import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isExpanded = false;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
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
