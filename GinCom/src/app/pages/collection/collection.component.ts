import { Router } from '@angular/router';
import { ProductServiceService } from './../../service/product-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  imports: [],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent implements OnInit {
  constructor(private productService:ProductServiceService,private router:Router){}

  categories : any[] = []
  ngOnInit(): void {
   this.productService.getProductCategories().subscribe((data)=>{
       console.log(data);
       this.categories = data;
   })
  }

  getProducts(category:string){
    this.router.navigate(['/products'], { queryParams: { category: category} });
  }

}
