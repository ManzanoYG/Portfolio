import { Component, inject, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavContent!: MatSidenavContent;
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  activeSection: string = 'profile';
  sections = ['profile', 'skills', 'experience', 'portfolio', 'education', 'contact'];

  ngAfterViewInit(): void {
    // Listen to scroll on mat-sidenav-content
    this.sidenavContent.getElementRef().nativeElement.addEventListener('scroll', () => {
      this.onScroll();
    });
  }

  onScroll(): void {
    const scrollElement = this.sidenavContent.getElementRef().nativeElement;
    const scrollPosition = scrollElement.scrollTop + 100; // Offset for toolbar

    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    const scrollElement = this.sidenavContent.getElementRef().nativeElement;
    
    if (element && scrollElement) {
      const yOffset = -64; // Toolbar height offset
      const y = element.offsetTop + yOffset;
      scrollElement.scrollTo({ top: y, behavior: 'smooth' });
      
      this.activeSection = sectionId;
      this.closeDrawerIfMobile();
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  closeDrawerIfMobile(): void {
    if (this.drawer && this.drawer.mode === 'over') {
      this.drawer.close();
    }
  }
}
