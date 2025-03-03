import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../model';


@Component({
  selector: 'app-card',
  imports: [CurrencyPipe,CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  arr : number[] = [1,2,3,4,5]
 @Input() product:Product = {
   id: 0,
   title: '',
   description: '',
   category: '',
   price: 0,
   discountPercentage: 0,
   rating: 0,
   stock: 0,
   thumbnail: '',
   warrantyInformation: '',
   shippingInformation: '',
   availabilityStatus: '',
   brand: '',
   weight: 0
 }

 constructor(private router: Router) {}

  viewProduct(userId: number) {
    this.router.navigate(['/product'], { queryParams: { id: userId } });
  }
}
