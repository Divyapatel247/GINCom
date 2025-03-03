import { CommonModule } from '@angular/common';
import { ProductServiceService } from './../../service/product-service.service';
import { Component, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { ToastComponent } from "../../component/toast/toast.component";
import { UpdateComponent } from "../../component/update/update.component";
import { Product } from '../../model';

@Component({
  selector: 'app-manage-product',
  imports: [CommonModule, ToastComponent,UpdateComponent],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  constructor(private productService:ProductServiceService){

  }
  products : Product[] =[]
  isDeleted : number[] =[]
  deleteToast : boolean = false;
  updatePopUp : boolean = false;
  productToUpdate : Product | null = null;
  isupdated : boolean = false;
  // updatePopUp = signal<boolean>(false)
  ngOnInit(): void {
      this.productService.getAllProducts().subscribe((data:any)=>{
        this.products = data.products;
        console.log(this.products)
      })
  }

  deleteProduct(id:number){
    this.isupdated = false;
    this.productService.deteteProductById(id).subscribe((data:any)=>{
      console.log(data);
      this.isDeleted.push(data.id);
      this.products = this.products.filter(product => !this.isDeleted.includes(product.id) )
      this.showDeleteToast()
    })
  }

  showDeleteToast():void{
     this.deleteToast = true;
     setTimeout(()=>{
      this.deleteToast = false;
     },3000)
  }

  UpdateProduct(item:Product){
    this.updatePopUp = true;
    this.productToUpdate = item;
    console.log(this.updatePopUp, this.productToUpdate);
    // this.productChange()
    // this.updatePopUp.set(true);
    // console.log(this.updatePopUp());
  }

  productChange(event:any){
    this.isupdated = true
    const productIndex = this.products.findIndex((product) => product.id === event?.id);
      this.products[productIndex] = { ...this.products[productIndex], ...event };
      console.log('product change');
      this.showDeleteToast();
  }

}

