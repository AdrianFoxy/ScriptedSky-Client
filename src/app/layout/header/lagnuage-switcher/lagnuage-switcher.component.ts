import { Component } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-lagnuage-switcher',
  standalone: true,
  imports: [],
  templateUrl: './lagnuage-switcher.component.html',
  styleUrl: './lagnuage-switcher.component.scss'
})
export class LagnuageSwitcherComponent {
  selectedLanguage: string = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }
}
