import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private selectedLanguageSubject = new BehaviorSubject<string>('EN');
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();

  toggleLanguage() {
    const newLanguage = this.selectedLanguageSubject.value === 'EN' ? 'UA' : 'EN';
    this.selectedLanguageSubject.next(newLanguage);
    console.log('Language changed to: ', newLanguage);
    
  }

  getSelectedLanguage() {
    return this.selectedLanguageSubject.value;
  }
}
