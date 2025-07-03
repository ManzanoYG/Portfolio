import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  education = [
    {
      title: 'Bachelor of Computer Science Application Development',
      date: '2020 - 2025',
      institution: 'High School Louvain in Hainaut Mons',
      description: '...'
    },
    {
      title: 'Higher Secondary Education Certificate - Computer Technician',
      date: '2017 - 2020',
      institution: 'Ath Provincial Institute of Secondary Education',
      description: '...'
    }
  ];

  experience = [
    {
      title: 'Developer Internship at BNP Paribas Fortis',
      date: '2025 - 2025',
      company: 'BNP Paribas Fortis, Brussels',
      description: 'Development of a web application for managing deals related to floating or fixed-rate deposits, with monthly revaluation monitoring. Technologies used: C#, ASP.NET, HTML, CSS, JavaScript, SQL Server, IIS, Microsoft Azure, jQuery, Ajax.'
    },
    {
      title: 'Freelance',
      date: '2021 - 2023',
      company: 'Loginfo, Ath',
      description: 'Website development in HTML, CSS, and PHP, IT project management, and network configuration. Interacting with clients to understand their needs and provide technical support. Optimizing system performance and maintaining security.'
    },
    {
      title: 'Computer Technician Internship at CDY',
      date: '2020',
      company: 'CDY, Bouvignies',
      description: 'Participated in the development of web and mobile projects, as well as testing and debugging. '
    }
  ];
}
