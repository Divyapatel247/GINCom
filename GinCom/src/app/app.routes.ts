import { Routes, ActivatedRoute } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { AuthGuard } from './guard/auth.guard';





export const routes: Routes = [

{
  path:"login",
  component:LoginComponent
},
{
  path:"",
  component:HeaderComponent,
  canActivate:[AuthGuard],
  children:[
    {
      path:"",
      component:HomeComponent
    },
    {
      path:"product",
      component:ProductComponent
    },
    {
      path:"products",
      component:ProductsComponent
    },
    {
      path:"collection",
      component:CollectionComponent

    },
    {
      path:"manageProduct",
      component:ManageProductComponent
    },
    {
      path:"addProduct",
      component:AddProductComponent
    },
    {
      path: 'dashboard',
      canActivate: [AuthGuard], // Keep the guard for consistency
      loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    }
  ]
},

];
