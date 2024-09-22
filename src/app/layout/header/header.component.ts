import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import {MatIcon} from '@angular/material/icon'
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatBadge,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

}
