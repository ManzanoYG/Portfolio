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
        { name: 'ITEMS.CSHARP', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.JAVA', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.PYTHON', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.JAVASCRIPT', level: 'LEVELS.BEGINNER' },
        { name: 'ITEMS.TYPESCRIPT', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.PHP', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.KOTLIN', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.SQL', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.VBA', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.BASH', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.JSON', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.XML', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.HTML5', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.CSS3', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.C', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.C++', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.REGEX', level: 'LEVELS.ADVANCED' }
      ]
    },
    {
      title: 'CATEGORIES.FRONTEND',
      icon: 'fa-laptop-code',
      skills: [
        { name: 'ITEMS.HTML5', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.CSS3', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.JAVASCRIPT', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.TYPESCRIPT', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.REACTIVEFORMS', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.BOOTSTRAP', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.RESPONSIVE_DESIGN', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.JQUERY', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.AJAX', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.DOM_MANIPULATION', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.API_INTEGRATION', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.ANGULAR', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.MATERIAL_DESIGN', level: 'LEVELS.ADVANCED' }
      ]
    },
    {
      title: 'CATEGORIES.BACKEND',
      icon: 'fa-server',
      skills: [
        { name: 'ITEMS.NET', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.NETCORE', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.ASPNET', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.ASPNETCORE', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.MVC', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.REST_API', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.BLAZOR', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.ENTITYFRAMEWORK', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.JWT', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.LOGGING', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.DATAVALIDATION', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.NODEJS', level: 'LEVELS.ADVANCED' },
      ]
    },
    {
      title: 'CATEGORIES.TOOLS',
      icon: 'fa-tools',
      skills: [
        { name: 'ITEMS.GIT', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.GITHUB', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.GITLAB', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.GIT_FLOW', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.DOCKER', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.DOCKER_COMPOSE', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.IIS', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.LINUX', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.WINDOWS', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.BASH_SCRIPTING', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.POWERSHELL', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.VERSIONING', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.VISUAL_STUDIO', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.VISUAL_STUDIO_CODE', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.JETBRAINS', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.ECLIPSE', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.ANDROID_STUDIO', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.SSMS', level: 'LEVELS.EXPERT' },
        { name: 'ITEMS.FIGMA', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.JIRA', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.TRELLO', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.POSTMAN', level: 'LEVELS.ADVANCED' }
      ]
    },
    {
      title: 'CATEGORIES.DATABASES',
      icon: 'fa-database',
      skills: [
        { name: 'ITEMS.SQL_SERVER', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.MYSQL', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.SQLITE', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.INDEXING', level: 'LEVELS.INTERMEDIATE' },
        { name: 'ITEMS.TRIGGTERS', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.JSON_DATA_HANDLING', level: 'LEVELS.ADVANCED' },
        { name: 'ITEMS.CONNECTIONS_POOLING', level: 'LEVELS.EXPERT' }
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
        { name: 'ITEMS.CONTINUOUS_LEARNING' },
        { name: 'ITEMS.AGILE' },
        { name: 'ITEMS.SCRUM' },
        { name: 'ITEMS.REQUIREMENTS_ANALYSIS' },
        { name: 'ITEMS.AUTONOMY' },
        { name: 'ITEMS.TECHNOLOGICAL_CURIOSITY' },
        { name: 'ITEMS.CODE_REVIEW' },
        { name: 'ITEMS.DEBUGGING' },
        { name: 'ITEMS.PRIORITY_MANAGEMENT' },
        { name: 'ITEMS.SOLUTION_ORIENTATION' },
        { name: 'ITEMS.STRESS_MANAGEMENT' },
        { name: 'ITEMS.DEADLINE_RESPECT' }
      ]
    }
  ];

  openModal(category: SkillCategory): void {
    this.modalTitle = category.title;
    this.modalSkills = [...category.skills];
    this.displayedSkills = [...category.skills];
    this.sortBy = null;
    this.isModalOpen = true;
    this.setDark();
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
    this.setDark();
  }

  sortAlphabetically(): void {
    this.sortBy = 'alphabetical';
    this.displayedSkills = [...this.modalSkills].sort((a, b) => {
      const nameA = this.getTranslation(a.name).toLowerCase();
      const nameB = this.getTranslation(b.name).toLowerCase();
      return nameA.localeCompare(nameB);
    });
    this.setDark();
  }

  resetSort(): void {
    this.sortBy = null;
    this.displayedSkills = [...this.modalSkills];
    this.setDark();
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

  setDark() {
    setTimeout(() => {
      const isDarkMode = document.querySelector('.dark-theme') !== null;
      if (isDarkMode) {
        document.querySelectorAll('.modal-content .skill-item, .modal-content .skill-name, .modal-content .sort-btn').forEach(element => {
          element.classList.add('dark-theme');
        });
      }
    }, 1);
  }
}
