import {
  ProductServiceService,
} from './../../service/product-service.service';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../model';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {


  productForm: FormGroup;
  catogryList : [] | null = null;

  constructor(private productService: ProductServiceService,private fb:FormBuilder){
    this.productForm = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(3)]],
      brand: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required]],
      weight: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(3)]],
      discountPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      description: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.productService.getCategory().subscribe((data)=>{
        this.catogryList = data;
        console.log(this.catogryList);
    })
  }

  isCreated: boolean = false;


  addProduct() {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      console.log('Form Data:', productData);

      // Call the service to add the product
      this.productService.addProduct(productData).subscribe(
        (res) => {
          console.log('Product added successfully:', res);
          this.showTost()
          this.productForm.reset();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }


  showTost() {
    this.isCreated = true;
    setTimeout(() => {
      this.isCreated = false;
    }, 3000);
  }


}
