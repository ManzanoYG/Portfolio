import { Component, Input } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() sidenavContent!: MatSidenavContent;

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
}
