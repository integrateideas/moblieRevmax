import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  spinnerEnabled = true;
  products: Object;
  constructor(public wordpress: WordpressService) { 
    console.log('In home');
  }

  ngOnInit() {
    this.spinnerEnabled = true;
    this.wordpress.fetchCategories()
      .subscribe(products => {
        this.products = products;
        this.spinnerEnabled = false;
        console.log('home data' + products);
      }),(error) => console.log(error);
  }

}
