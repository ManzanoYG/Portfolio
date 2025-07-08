import { Component, OnInit, OnDestroy } from '@angular/core';

interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  fullDescriptionKey: string;
  category: 'game' | 'web' | 'other';
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  itemsPerSlide = 6;
  
  selectedFilter: 'all' | 'game' | 'web' | 'other' = 'all';
  selectedProject: Project | null = null;
  showProjectModal = false;
  showAllProjectsModal = false;
  
  private resizeListener?: () => void;

  projects: Project[] = [
    {
      id: 1,
      titleKey: 'PROJECTS.ECOMMERCE.TITLE',
      descriptionKey: 'PROJECTS.ECOMMERCE.DESCRIPTION',
      fullDescriptionKey: 'PROJECTS.ECOMMERCE.FULL_DESCRIPTION',
      category: 'web',
      image: 'assets/img/profile.jpg',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'TypeScript'],
      link: 'https://example.com',
      github: 'https://github.com/example'
    },
    {
      id: 2,
      titleKey: 'PROJECTS.MOBILE_GAME.TITLE',
      descriptionKey: 'PROJECTS.MOBILE_GAME.DESCRIPTION',
      fullDescriptionKey: 'PROJECTS.MOBILE_GAME.FULL_DESCRIPTION',
      category: 'game',
      image: 'assets/img/profile.jpg',
      technologies: ['Unity', 'C#', 'Android', 'iOS'],
      github: 'https://github.com/example'
    },
    {
      id: 3,
      titleKey: 'PROJECTS.TASK_MANAGER.TITLE',
      descriptionKey: 'PROJECTS.TASK_MANAGER.DESCRIPTION',
      fullDescriptionKey: 'PROJECTS.TASK_MANAGER.FULL_DESCRIPTION',
      category: 'web',
      image: 'assets/img/profile.jpg',
      technologies: ['React', 'Firebase', 'Material-UI'],
      link: 'https://example.com'
    },
    {
      id: 4,
      titleKey: 'PROJECTS.DESKTOP_APP.TITLE',
      descriptionKey: 'PROJECTS.DESKTOP_APP.DESCRIPTION',
      fullDescriptionKey: 'PROJECTS.DESKTOP_APP.FULL_DESCRIPTION',
      category: 'other',
      image: 'assets/img/profile.jpg',
      technologies: ['Electron', 'Python', 'SQLite'],
      github: 'https://github.com/example'
    },
    {
      id: 5,
      titleKey: 'PROJECTS.PORTFOLIO_WEBSITE.TITLE',
      descriptionKey: 'PROJECTS.PORTFOLIO_WEBSITE.DESCRIPTION',
      fullDescriptionKey: 'PROJECTS.PORTFOLIO_WEBSITE.FULL_DESCRIPTION',
      category: 'web',
      image: 'assets/img/profile.jpg',
      technologies: ['Angular', 'TypeScript', 'CSS3', 'Bootstrap'],
      github: 'https://github.com/example'
    },
    {
      id: 6,
      titleKey: 'PROJECTS.PUZZLE_GAME.TITLE',
      descriptionKey: 'PROJECTS.PUZZLE_GAME.DESCRIPTION',
      fullDescriptionKey: 'PROJECTS.PUZZLE_GAME.FULL_DESCRIPTION',
      category: 'game',
      image: 'assets/img/profile.jpg',
      technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
      link: 'https://example.com'
    },
    {
      id: 7,
      titleKey: 'PROJECTS.REST_API.TITLE',
      descriptionKey: 'PROJECTS.REST_API.DESCRIPTION',
      fullDescriptionKey: 'PROJECTS.REST_API.FULL_DESCRIPTION',
      category: 'other',
      image: 'assets/img/profile.jpg',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      github: 'https://github.com/example'
    },
    {
      id: 8,
      titleKey: 'PROJECTS.CHAT_APP.TITLE',
      descriptionKey: 'PROJECTS.CHAT_APP.DESCRIPTION',
      fullDescriptionKey: 'PROJECTS.CHAT_APP.FULL_DESCRIPTION',
      category: 'web',
      image: 'assets/img/profile.jpg',
      technologies: ['Vue.js', 'Socket.io', 'Node.js'],
      link: 'https://example.com'
    }
  ];

  ngOnInit() {
    this.updateItemsPerSlide();
    this.resizeListener = () => this.updateItemsPerSlide();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private updateItemsPerSlide() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.itemsPerSlide = 3; // 3 projects on mobile/tablet
    } else if (width <= 992) {
      this.itemsPerSlide = 4; // 4 projects on small desktop
    } else {
      this.itemsPerSlide = 6; // 6 projects on large desktop
    }
    
    // Reset to first slide if current slide is out of bounds
    if (this.currentSlide >= this.totalSlides) {
      this.currentSlide = 0;
    }
  }

  get filteredProjects(): Project[] {
    if (this.selectedFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.selectedFilter);
  }

  get visibleProjects(): Project[] {
    const filtered = this.filteredProjects;
    const startIndex = this.currentSlide * this.itemsPerSlide;
    return filtered.slice(startIndex, startIndex + this.itemsPerSlide);
  }

  get totalSlides(): number {
    return Math.ceil(this.filteredProjects.length / this.itemsPerSlide);
  }

  setFilter(filter: 'all' | 'game' | 'web' | 'other') {
    this.selectedFilter = filter;
    this.currentSlide = 0; // Reset to first slide when filter changes
    this.updateItemsPerSlide(); // Recalculate items per slide
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(slideIndex: number) {
    this.currentSlide = slideIndex;
  }

  getDotArray(): number[] {
    return Array.from({ length: this.totalSlides }, (_, i) => i);
  }

  openProjectModal(project: Project) {
    this.selectedProject = project;
    this.showProjectModal = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal() {
    this.showProjectModal = false;
    this.selectedProject = null;
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  // Close modal when clicking outside
  onModalBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeProjectModal();
    }
  }

  openAllProjectsModal() {
    this.showAllProjectsModal = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeAllProjectsModal() {
    this.showAllProjectsModal = false;
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  // Close modal when clicking outside
  onAllProjectsModalBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeAllProjectsModal();
    }
  }

  getCategoryTitle(): string {
    switch (this.selectedFilter) {
      case 'all': return 'PORTFOLIO.ALL_PROJECTS';
      case 'game': return 'PORTFOLIO.GAME_PROJECTS';
      case 'web': return 'PORTFOLIO.WEB_PROJECTS';
      case 'other': return 'PORTFOLIO.OTHER_PROJECTS';
      default: return 'PORTFOLIO.ALL_PROJECTS';
    }
  }

  openProjectFromAllModal(project: Project) {
    this.closeAllProjectsModal();
    setTimeout(() => {
      this.openProjectModal(project);
    }, 300); // Small delay to allow the first modal to close
  }
}
