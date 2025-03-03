import { routes } from './../../app.routes';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  route = inject(Router);

  logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.route.navigate(['/login'])
  }
}
