import { routes } from './../../app.routes';
import { Component, Input, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../component/card/card.component';
import {
  ProductServiceService,
} from '../../service/product-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model';

@Component({
  selector: 'app-products',
  imports: [CardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute
  ) {}
  products: Product[] = [];
  category: string = '';
  // @Input() products = signal<Product[]>([])
  isLoaded: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'];
      // this.onRouteOrQueryChange();
      // console.log('User ID:', this.userId);


      if(this.category) {
        this.productService
          .getProductByCategory(this.category)
          .subscribe(
            {
              next:(res)=>{
                this.products = res.products;
                  console.log(this.products);
              },
              error:(e)=>{
                console.log(e.error)
              }
            }
        );
        }
      else {
        this.productService.getAllProducts().subscribe({
          next:(data:any)=>{
            this.products = data.products;
              console.log(this.products);
          },
          error:(e)=>{
            console.log(e.error)
          }
        }
      );
      }
    });

    // console.log(this.products.length)
  }



}
