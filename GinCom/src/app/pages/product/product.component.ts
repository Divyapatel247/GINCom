import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  ProductServiceService } from '../../service/product-service.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../model';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  userId!: number;
  arr : number[] = [1,2,3,4,5]

  constructor(private route: ActivatedRoute,private productService:ProductServiceService) {}


    product : Product = {
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
    };

    ngOnInit(): void {

      this.route.queryParams.subscribe((params) => {
        this.userId = +params['id'];
        console.log('User ID:', this.userId);

        this.productService.getProductById(this.userId).subscribe((data:Product)=>{
          this.product = data;
          console.log(this.product)
        })
      });
      }

}
