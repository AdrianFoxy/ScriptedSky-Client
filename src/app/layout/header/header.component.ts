import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BusyService } from '../../core/services/busy.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CartService } from '../../core/services/cart.service';
import { LagnuageSwitcherComponent } from "./lagnuage-switcher/lagnuage-switcher.component";
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatBadge,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatProgressBar,
    LagnuageSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen = false;
  isProfileMenu = false;

  busyService = inject(BusyService);
  cartService = inject(CartService);
  accountService = inject(AccountService);
  private router = inject(Router);

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  profileToggleMenu() {
    if (!this.accountService.currentUser()) {
      this.router.navigate(['/account/login']);    
    } else {
      this.isProfileMenu = !this.isProfileMenu;
    }
  }

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dropdown = document.getElementById('dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.isProfileMenu = false;
    }
  }

}
