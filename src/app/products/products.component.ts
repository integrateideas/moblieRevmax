import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  spinnerEnabled = true;
  productSlug: any;
  categoryId: any;
  products: any = [];

  constructor(public acivatedRoute: ActivatedRoute, public wordpress: WordpressService) {
    console.log('In product component');
   }

  ngOnInit() {
    this.spinnerEnabled = true;
    this.acivatedRoute.params.subscribe(res => {
       this.productSlug = res.slug;
       this.categoryId = res.category_id; 
       this.fetchProductCategories(this.categoryId);
    });
  }

  fetchProductCategories(catId) {
    this.wordpress.fetchCategoryProducts(catId)
      .subscribe(products => {
        this.products = products;
        this.spinnerEnabled = false;
        console.log('home data' + products);
      }), (error) => console.log(error);
  }

}
