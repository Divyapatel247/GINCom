import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Product } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private products$ = new BehaviorSubject<any[]>([]);

  constructor(private http:HttpClient) {}

  getAllProducts(): Observable<Product[]> {

    if(this.products$.getValue().length === 0){
      console.log('Fetching products from API...');
       this.http.get<Product[]>('https://dummyjson.com/products').subscribe((data)=>{
        console.log('Products fetched:', data);
        this.products$.next(data);
      });
    }
    return this.products$.asObservable();
  }

  getProductById(id:number): Observable<Product>{
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  deteteProductById(id:number): Observable<number>{
    return this.http.delete<number>(`https://dummyjson.com/products/${id}`);
  }

  addProduct(product:any): Observable<Product>{
    return this.http.post<Product>('https://dummyjson.com/products/add',product).pipe(
      tap((newProduct) => {
        const currentProducts = this.products$.getValue();
        const updatedProducts = [...currentProducts, newProduct];
        this.products$.next(updatedProducts);
      })
    );
  }

  // setProduct(id:number | undefined,product:any): Observable<any>{
  //   return this.http.put<any>(`https://dummyjson.com/products/${id}`,{
  //     title: product.title,
  //     description: product.description,
  //     price: product.price,
  //     discountPercentage: product.discountPercentage,
  //     stock: product.stock,
  //     rating  : product.rating,
  //     images: product.images,
  //     thumbnail: product.thumbnail,
  //     category: product.category,
  //     brand : product.brand
  //   });
  // }

  setProduct(id:number | undefined,product:Product): Observable<Product>{
    return this.http.put<Product>(`https://dummyjson.com/products/${id}`,product);
  }

  getCategory(): Observable<any>{
    return this.http.get('https://dummyjson.com/products/category-list');
  }
  getProductCategories(): Observable<any>{
    return this.http.get('https://dummyjson.com/products/categories');
  }

  getProductByCategory(cat:string): Observable<any>{
    return this.http.get('https://dummyjson.com/products/category/'+cat).pipe(
      tap(()=>{
          this.products$.next([]); // Optional if you want to reset the cache
      })
    );
  }

  login(user:object): Observable<any>{
    return this.http.post('https://dummyjson.com/auth/login',user);
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<{ accessToken: string }>('https://dummyjson.com/auth/refresh', { refreshToken }).pipe(
      map((response) => {
        const newAccessToken = response.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
      })
    );
  }


}




































// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class CRUDService<T> {
//   constructor(private http: HttpClient) {}

//   // Base API endpoint
//   private baseUrl = '/api/items';

//   // Create a new resource
//   create(item: T): Observable<T> {
//     return this.http.post<T>(this.baseUrl, item);
//   }

//   // Read a single resource by ID
//   getById(id: string | number): Observable<T> {
//     return this.http.get<T>(`${this.baseUrl}/${id}`);
//   }

//   // Read all resources
//   getAll(): Observable<T[]> {
//     return this.http.get<T[]>(this.baseUrl);
//   }

//   // Update a resource
//   update(id: string | number, item: T): Observable<T> {
//     return this.http.put<T>(`${this.baseUrl}/${id}`, item);
//   }

//   // Delete a resource
//   delete(id: string | number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${id}`);
//   }
// }

