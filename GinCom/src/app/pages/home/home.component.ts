import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../component/card/card.component";
import { SliderComponent } from "../../component/slider/slider.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router){}

  onClick(){

    this.router.navigate(['/dashboard'])
  }


}
