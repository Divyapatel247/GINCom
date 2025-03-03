import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductServiceService } from '../../service/product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}
  productService = inject(ProductServiceService);

  userObj : User = new User();

  logedin(){
      this.productService.login(this.userObj).subscribe((res)=>{
            console.log(res)
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)

            this.router.navigate(['/products'])
      })
  }

}


export class User {
 username : string;
 password : string;

  constructor() {
   this.username = '';
   this.password = '';
  };
}
