import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

interface Skill {
  name: string;
  level?: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  isModalOpen = false;
  modalTitle = '';
  modalSkills: Skill[] = [];
  displayedSkills: Skill[] = [];
  skillsData: any = {};
  sortBy: 'level' | 'alphabetical' | 'none' | null = null;

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadSkills();
    this.translate.onLangChange.subscribe(() => {
      this.loadSkills();
    });
  }

  loadSkills(): void {
    const lang = this.translate.currentLang || 'en';
    this.http.get(`assets/i18n/skills-${lang}.json`).subscribe((data: any) => {
      this.skillsData = data;
    });
  }

  skillCategories: SkillCategory[] = [
    {
      title: 'CATEGORIES.LANGUAGES',
      icon: 'fa-code',
      skills: [
        { name: 'ITEMS.JAVASCRIPT', level: 'LEVELS.BEGINNER' },
        { name: 'ITEMS.TYPESCRIPT', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.PYTHON', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.PHP', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.JAVA', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.CSHARP', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.SQL', level: 'LEVELS.ADVANCED' }
      ]
    },
    {
      title: 'CATEGORIES.FRONTEND',
      icon: 'fa-laptop-code',
      skills: [
        { name: 'ITEMS.ANGULAR', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.REACT', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.VUE', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.HTML_CSS', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.SASS', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.BOOTSTRAP', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.MATERIAL_DESIGN', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.RESPONSIVE_DESIGN', level: 'LEVELS.EXPERT' }
      ]
    },
    {
      title: 'CATEGORIES.BACKEND',
      icon: 'fa-server',
      skills: [
        { name: 'ITEMS.NODEJS', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.EXPRESS', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.LARAVEL', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.DJANGO', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.REST_API', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.GRAPHQL', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.MONGODB', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.MYSQL', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.POSTGRESQL', level: 'LEVELS.ADVANCED' }
      ]
    },
    {
      title: 'CATEGORIES.TOOLS',
      icon: 'fa-tools',
      skills: [
        { name: 'ITEMS.GIT', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.DOCKER', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.VSCODE', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.FIGMA', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.POSTMAN', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.JENKINS', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.JIRA', level: 'LEVELS.ADVANCED' }
      ]
    },
    {
      title: 'CATEGORIES.DEVOPS',
      icon: 'fa-cloud',
      skills: [
        { name: 'ITEMS.LINUX', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.CI_CD', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.AWS', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.AZURE', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.NGINX', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.APACHE', level: 'LEVELS.ADVANCED' }
      ]
    },
    {
      title: 'CATEGORIES.SOFT_SKILLS',
      icon: 'fa-users',
      skills: [
        { name: 'ITEMS.COMMUNICATION' },
        { name: 'ITEMS.PROBLEM_SOLVING' },
        { name: 'ITEMS.TEAMWORK' },
        { name: 'ITEMS.ADAPTABILITY' },
        { name: 'ITEMS.TIME_MANAGEMENT' },
        { name: 'ITEMS.CONTINUOUS_LEARNING' }
      ]
    }
  ];

  openModal(category: SkillCategory): void {
    this.modalTitle = category.title;
    this.modalSkills = [...category.skills];
    this.displayedSkills = [...category.skills];
    this.sortBy = null;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  sortByLevel(): void {
    this.sortBy = 'level';
    const levelOrder: { [key: string]: number } = {
      'LEVELS.EXPERT': 1,
      'LEVELS.ADVANCED': 2,
      'LEVELS.INTERMEDIATE': 3,
      'LEVELS.BEGINNER': 4
    };

    this.displayedSkills = [...this.modalSkills].sort((a, b) => {
      const levelA = a.level ? levelOrder[a.level] || 999 : 999;
      const levelB = b.level ? levelOrder[b.level] || 999 : 999;
      return levelA - levelB;
    });
  }

  sortAlphabetically(): void {
    this.sortBy = 'alphabetical';
    this.displayedSkills = [...this.modalSkills].sort((a, b) => {
      const nameA = this.getTranslation(a.name).toLowerCase();
      const nameB = this.getTranslation(b.name).toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  resetSort(): void {
    this.sortBy = null;
    this.displayedSkills = [...this.modalSkills];
  }

  getLevelClass(level: string): string {
    if (level.includes('EXPERT')) return 'expert';
    if (level.includes('ADVANCED')) return 'advanced';
    if (level.includes('INTERMEDIATE')) return 'intermediate';
    if (level.includes('BEGINNER')) return 'beginner';
    return '';
  }

  getTranslation(key: string): string {
    if (!key || !this.skillsData) return key;
    const parts = key.split('.');
    let value = this.skillsData;
    for (const part of parts) {
      value = value?.[part];
      if (!value) return key;
    }
    return value;
  }
}
