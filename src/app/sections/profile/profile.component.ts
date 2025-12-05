import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  birthDate: Date = new Date(2000, 3, 21);
  showLinkedInText = false;
  showGitHubText = false;
  showDownloadText = false;

  public getAge(): any {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDifference = today.getMonth() - this.birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
