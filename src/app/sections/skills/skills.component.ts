import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skillCategories = [
    {
      title: 'FRONTEND',
      skills: [
        { name: 'Angular', icon: 'fab fa-angular' },
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Vue.js', icon: 'fab fa-vuejs' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'TypeScript', icon: 'fas fa-code' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
        { name: 'Sass', icon: 'fab fa-sass' },
        { name: 'jQuery', icon: 'fas fa-code' }
      ]
    },
    {
      title: 'BACKEND',
      skills: [
        { name: 'Node.js', icon: 'fab fa-node-js' },
        { name: 'C#', icon: 'fas fa-code' },
        { name: 'ASP.NET', icon: 'fas fa-server' },
        { name: 'PHP', icon: 'fab fa-php' },
        { name: 'Java', icon: 'fab fa-java' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'SQL Server', icon: 'fas fa-database' },
        { name: 'MySQL', icon: 'fas fa-database' },
        { name: 'MongoDB', icon: 'fas fa-database' },
        { name: 'Express.js', icon: 'fas fa-server' }
      ]
    },
    {
      title: 'TOOLS',
      skills: [
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'VS Code', icon: 'fas fa-code' },
        { name: 'Docker', icon: 'fab fa-docker' },
        { name: 'Figma', icon: 'fab fa-figma' },
        { name: 'Postman', icon: 'fas fa-paper-plane' },
        { name: 'Jira', icon: 'fab fa-jira' },
        { name: 'npm', icon: 'fab fa-npm' },
        { name: 'Webpack', icon: 'fas fa-tools' },
        { name: 'Vite', icon: 'fas fa-tools' }
      ]
    },
    {
      title: 'ENVIRONMENTS',
      skills: [
        { name: 'Windows', icon: 'fab fa-windows' },
        { name: 'Linux', icon: 'fab fa-linux' },
        { name: 'Azure', icon: 'fab fa-microsoft' },
        { name: 'AWS', icon: 'fab fa-aws' },
        { name: 'IIS', icon: 'fas fa-server' },
        { name: 'Apache', icon: 'fas fa-server' },
        { name: 'Nginx', icon: 'fas fa-server' },
        { name: 'Firebase', icon: 'fab fa-google' },
        { name: 'Vercel', icon: 'fas fa-cloud' },
        { name: 'Netlify', icon: 'fas fa-cloud' }
      ]
    }
  ];

  currentSlide: { [key: string]: number } = {
    'FRONTEND': 0,
    'BACKEND': 0,
    'TOOLS': 0,
    'ENVIRONMENTS': 0
  };

  isTransitioning: { [key: string]: boolean } = {
    'FRONTEND': false,
    'BACKEND': false,
    'TOOLS': false,
    'ENVIRONMENTS': false
  };

  showAllSkills = false;
  selectedCategory: any = null;

  itemsPerSlide = 6;

  nextSlide(category: string) {
    if (this.isTransitioning[category]) return;
    
    const categoryData = this.skillCategories.find(cat => cat.title === category);
    if (categoryData) {
      this.isTransitioning[category] = true;
      
      setTimeout(() => {
        const maxSlide = Math.ceil(categoryData.skills.length / this.itemsPerSlide) - 1;
        this.currentSlide[category] = (this.currentSlide[category] + 1) % (maxSlide + 1);
        
        setTimeout(() => {
          this.isTransitioning[category] = false;
        }, 50);
      }, 150);
    }
  }

  prevSlide(category: string) {
    if (this.isTransitioning[category]) return;
    
    const categoryData = this.skillCategories.find(cat => cat.title === category);
    if (categoryData) {
      this.isTransitioning[category] = true;
      
      setTimeout(() => {
        const maxSlide = Math.ceil(categoryData.skills.length / this.itemsPerSlide) - 1;
        this.currentSlide[category] = this.currentSlide[category] === 0 ? maxSlide : this.currentSlide[category] - 1;
        
        setTimeout(() => {
          this.isTransitioning[category] = false;
        }, 50);
      }, 150);
    }
  }

  getVisibleSkills(category: string) {
    const categoryData = this.skillCategories.find(cat => cat.title === category);
    if (!categoryData) return [];
    
    const startIndex = this.currentSlide[category] * this.itemsPerSlide;
    return categoryData.skills.slice(startIndex, startIndex + this.itemsPerSlide);
  }

  getDotCount(category: string) {
    const categoryData = this.skillCategories.find(cat => cat.title === category);
    if (!categoryData) return 0;
    return Math.ceil(categoryData.skills.length / this.itemsPerSlide);
  }

  goToSlide(category: string, slideIndex: number) {
    if (this.isTransitioning[category]) return;
    
    this.isTransitioning[category] = true;
    
    setTimeout(() => {
      this.currentSlide[category] = slideIndex;
      
      setTimeout(() => {
        this.isTransitioning[category] = false;
      }, 50);
    }, 150);
  }

  openAllSkills(category: string) {
    this.selectedCategory = this.skillCategories.find(cat => cat.title === category);
    this.showAllSkills = true;
    document.body.style.overflow = 'hidden';
  }

  closeAllSkills() {
    this.showAllSkills = false;
    this.selectedCategory = null;
    document.body.style.overflow = 'auto';
  }

  onModalBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeAllSkills();
    }
  }
}
