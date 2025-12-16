import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: string;
  image: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  dateKey: string;
  detailsKey: string;
  display: boolean;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {
  portfolioData: any = {};
  allProjects: Project[] = [];
  displayedProjects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: string = 'all';
  projectsPerPage: number = 6;
  currentPage: number = 1;
  
  selectedProject: Project | null = null;
  isModalOpen = false;
  currentImageIndex = 0;

  categories = [
    { key: 'all', icon: 'fa-th' },
    { key: 'web', icon: 'fa-globe' },
    { key: 'mobile', icon: 'fa-mobile-alt' },
    { key: 'backend', icon: 'fa-server' },
    { key: 'desktop', icon: 'fa-layer-group' },
    { key: 'game_dev', icon: 'fa-gamepad' }
  ];

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadPortfolioData();
    this.translate.onLangChange.subscribe(() => {
      this.loadPortfolioData();
    });
    this.initializeProjects();
  }

  loadPortfolioData(): void {
    const lang = this.translate.currentLang || 'en';
    this.http.get(`assets/i18n/portfolio-${lang}.json`).subscribe((data: any) => {
      this.portfolioData = data;
    });
  }

  initializeProjects(): void {
    this.allProjects = [
      {
        id: '1',
        titleKey: 'PROJECTS.PROJECT1.TITLE',
        descriptionKey: 'PROJECTS.PROJECT1.DESCRIPTION',
        category: 'desktop',
        image: 'assets/img/projects/pos/pos_table.png',
        images: [
          'assets/img/projects/pos/pos_table.png'
        ],
        technologies: ['Java', 'JavaFX', 'JSON', 'CSS'],
        dateKey: 'PROJECTS.PROJECT1.DATE',
        detailsKey: 'PROJECTS.PROJECT1.DETAILS',
        display: true
      },
      {
        id: '2',
        titleKey: 'PROJECTS.PROJECT2.TITLE',
        descriptionKey: 'PROJECTS.PROJECT2.DESCRIPTION',
        category: 'web',
        image: 'assets/img/projects/portfolio/portfolio_main.png',
        technologies: ['Angular', 'Node.js', 'BOOT', 'TypeScript', 'Material'],
        githubUrl: 'https://github.com/ManzanoYG/Portfolio',
        liveUrl: 'https://mathiasmanzanoygonzalez.be/',
        dateKey: 'PROJECTS.PROJECT2.DATE',
        detailsKey: 'PROJECTS.PROJECT2.DETAILS',
        display: true
      },
      {
        id: '3',
        titleKey: 'PROJECTS.PROJECT3.TITLE',
        descriptionKey: 'PROJECTS.PROJECT3.DESCRIPTION',
        category: 'desktop',
        image: 'assets/img/projects/password_generator/password_empty.png',
        images: [
          'assets/img/projects/password_generator/password_empty.png',
          'assets/img/projects/password_generator/password_generate.png',
          'assets/img/projects/password_generator/password_copied.png',
          'assets/img/projects/password_generator/password_error1.png',
          'assets/img/projects/password_generator/password_error2.png',
        ],
        technologies: ['Python', 'Tkinter'],
        githubUrl: 'https://github.com/ManzanoYG/Password-Generator',
        dateKey: 'PROJECTS.PROJECT3.DATE',
        detailsKey: 'PROJECTS.PROJECT3.DETAILS',
        display: true
      },
      {
        id: '4',
        titleKey: 'PROJECTS.PROJECT4.TITLE',
        descriptionKey: 'PROJECTS.PROJECT4.DESCRIPTION',
        category: 'web',
        image: 'assets/img/projects/ibsi/ibsi_home.png',
        images: [
          'assets/img/projects/ibsi/ibsi_home.png',
          'assets/img/projects/ibsi/ibsi_room.png'
        ],
        technologies: ['PHP', 'JavaScript', 'MySQL', 'jQuery', 'Ajax'],
        githubUrl: 'https://github.com/ManzanoYG/IBSI-Hotel',
        liveUrl: 'https://mathiasmanzanoygonzalez.be/projects/ibsi/index.php',
        dateKey: 'PROJECTS.PROJECT4.DATE',
        detailsKey: 'PROJECTS.PROJECT4.DETAILS',
        display: true
      },
      {
        id: '5',
        titleKey: 'PROJECTS.PROJECT5.TITLE',
        descriptionKey: 'PROJECTS.PROJECT5.DESCRIPTION',
        category: 'web',
        image: 'assets/img/projects/waymate_F/waymate_home.png',
        images: [
          'assets/img/projects/waymate_F/waymate_home.png',
          'assets/img/projects/waymate_F/waymate_signup.png',
          'assets/img/projects/waymate_F/waymate_signin.png'
        ],
        technologies: ['Angular', 'TypeScript', 'SQL Server', 'Bootstrap', 'Cypress'],
        githubUrl: 'https://github.com/ManzanoYG/Waymate_Frontend',
        liveUrl: 'https://mathiasmanzanoygonzalez.be/projects/waymate_front/index.html',
        dateKey: 'PROJECTS.PROJECT5.DATE',
        detailsKey: 'PROJECTS.PROJECT5.DETAILS',
        display: true
      },
      {
        id: '6',
        titleKey: 'PROJECTS.PROJECT6.TITLE',
        descriptionKey: 'PROJECTS.PROJECT6.DESCRIPTION',
        category: 'backend',
        image: 'assets/img/projects/waymate_api/waymate_api_1.png',
        images: [
          'assets/img/projects/waymate_api/waymate_api_1.png',
          'assets/img/projects/waymate_api/waymate_api_2.png',
          'assets/img/projects/waymate_api/waymate_api_3.png',
          'assets/img/projects/waymate_api/waymate_api_4.png'
        ],
        technologies: ['C#', 'Docker', 'SQL Server', 'ASP.NET', 'Swagger'],
        githubUrl: 'https://github.com/ManzanoYG/Waymate_API',
        dateKey: 'PROJECTS.PROJECT6.DATE',
        detailsKey: 'PROJECTS.PROJECT6.DETAILS',
        display: true
      }
    ];
    this.filterProjects('all');
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    
    if (category === 'all') {
      this.filteredProjects = this.allProjects.filter(p => p.display !== false);
    } else {
      this.filteredProjects = this.allProjects.filter(p => p.category === category && p.display !== false);
    }
    
    this.updateDisplayedProjects();
  }

  updateDisplayedProjects(): void {
    const endIndex = this.currentPage * this.projectsPerPage;
    this.displayedProjects = this.filteredProjects.slice(0, endIndex);
  }

  loadMore(): void {
    this.currentPage++;
    this.updateDisplayedProjects();
  }

  hasMoreProjects(): boolean {
    return this.displayedProjects.length < this.filteredProjects.length;
  }

  openProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.currentImageIndex = 0;
    this.isModalOpen = true;
    
    this.applyDarkThemeToModal();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProject = null;
    this.currentImageIndex = 0;
  }

  nextImage(): void {
    if (this.selectedProject && this.selectedProject.images) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProject.images.length;
    }
  }

  prevImage(): void {
    if (this.selectedProject && this.selectedProject.images) {
      this.currentImageIndex = this.currentImageIndex === 0 
        ? this.selectedProject.images.length - 1 
        : this.currentImageIndex - 1;
    }
  }

  goToImage(index: number): void {
    this.currentImageIndex = index;
  }

  private applyDarkThemeToModal(): void {
    setTimeout(() => {
      const isDarkMode = document.querySelector('.dark-theme') !== null;
      if (isDarkMode) {
        document.querySelectorAll('.modal-content .detail-section, .modal-content .detail-section h4, .modal-content .detail-section p, .modal-content .project-links, .modal-content .project-link, .modal-content .category-badge, .modal-content .tech-badge, .modal-content .gallery-nav').forEach(element => {
          element.classList.add('dark-theme');
        });
      }
    }, 10);
  }

  getCurrentImage(): string {
    if (this.selectedProject) {
      if (this.selectedProject.images && this.selectedProject.images.length > 0) {
        return this.selectedProject.images[this.currentImageIndex];
      }
      return this.selectedProject.image;
    }
    return '';
  }

  getTranslation(key: string): string {
    if (!key || !this.portfolioData) return key;
    const parts = key.split('.');
    let value = this.portfolioData;
    for (const part of parts) {
      value = value?.[part];
      if (!value) return key;
    }
    return value;
  }

  getCategoryCount(category: string): number {
    if (category === 'all') return this.allProjects.filter(p => p.display !== false).length;
    return this.allProjects.filter(p => p.category === category && p.display !== false).length;
  }
}
