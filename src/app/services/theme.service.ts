import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkThemeSubject = new BehaviorSubject<boolean>(false);
  public isDarkTheme$ = this.darkThemeSubject.asObservable();

  toggleTheme(): void {
    const newValue = !this.darkThemeSubject.value;
    this.darkThemeSubject.next(newValue);
  }

  setTheme(isDark: boolean): void {
    this.darkThemeSubject.next(isDark);
  }

  isDarkTheme(): boolean {
    return this.darkThemeSubject.value;
  }
}
