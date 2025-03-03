// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    return isLoggedIn ? true : this.router.createUrlTree(['/login']);
  }
}



// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { ApiService } from '../shared/api.service';

// export const authGuard: CanActivateFn = (route, state) => {



//   const router = inject(Router);
//   const api = inject(ApiService);
//   const loggedData = localStorage.getItem("angular19Token");
//   const refreshToken = localStorage.getItem('angular19RefreshToken');


//   if (loggedData != null) {
//     console.log("User is logged in");
//     return true;
//   } else {
//     router.navigateByUrl("login");
//     return false;
//   }



// };
