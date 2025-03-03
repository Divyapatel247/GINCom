import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ProductServiceService,
} from '../../service/product-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../model';

@Component({
  selector: 'app-update',
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent implements OnInit {
  @Input() showPopup = false;
  @Input() product: any = null;
  @Output() showPopupChange = new EventEmitter<boolean>();
  @Output() productChange = new EventEmitter<Product | null>();
  isUpdated = false;
  // productForm: FormGroup;
  catogryList: [] | null = null;
  productForm:FormGroup;

  constructor(private productService: ProductServiceService,private fb:FormBuilder) {
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


  // productForm: FormGroup = new FormGroup({
  //   title: new FormControl([], [Validators.required, Validators.minLength(3)]),
  //   brand: new FormControl([], [Validators.required, Validators.minLength(3)]),
  //   price: new FormControl([], [Validators.required, Validators.min(3)]),
  //   category: new FormControl([], [Validators.required]),
  //   weight: new FormControl([], [Validators.required, Validators.min(3)]),
  //   stock: new FormControl([], [Validators.required, Validators.min(3)]),
  //   discountPercentage: new FormControl([]),
  //   description: new FormControl([],[Validators.required, Validators.minLength(3)]),
  // });

  ngOnInit(): void {



    this.productService.getCategory().subscribe((data) => {
      this.catogryList = data;
      console.log(this.catogryList);
    });
    this.productForm.patchValue(this.product);
  }

  closePopup() {
    this.showPopup = false;
    console.log('in the popup ' + this.showPopup);
    this.showPopupChange.emit(this.showPopup);
  }

  onUpdate(product: Product) {
    this.productService
      .setProduct(product?.id, this.productForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.showUpdateTost();
          this.productChange.emit(res);
          this.closePopup();
        },
        error: (e) => console.log(e),
      });
  }

  // showUpdateTost(){
  //   this.isUpdated = true;
  //   setTimeout(()=>{
  //       this.isUpdated = false;
  //   },3000)
  // }
}
