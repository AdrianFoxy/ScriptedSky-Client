import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const alredyAuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const snack = inject(SnackbarService);

  if (accountService.currentUser()) {
    router.navigate(['/']);
    snack.error('You already logged in');
    return false;
  } else {
    return accountService.getAuthState().pipe(
      map(auth => {
        if (!auth.isAuthenticated) {
          return true;
        } else {
          router.navigate(['/']);
          snack.error('You already logged in');
          return false;
        }
      })
    )
  }
};
