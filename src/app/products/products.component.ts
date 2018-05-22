import { Component, OnInit, TemplateRef, DoCheck} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from '../services/wordpress.service';
import { CustomService } from '../services/custom.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productCatName: any;
  productCatSlug: any;
  productCatResponse: any;
  productCategories: any;
  categoryName: any;
  attributeOptions: any[];
  attributes: any;
  spinnerEnabled = true;
  productSlug: any;
  categoryId: any;
  products: any = [];
  modalRef: BsModalRef;
  attributeResponse: any= {};

  constructor(public acivatedRoute: ActivatedRoute, public wordpress: WordpressService, public modalService: BsModalService,
    private router: Router, public customService: CustomService) {
    console.log('In product component');
   }


  ngOnInit() {
    this.products = []
    this.spinnerEnabled = true;
    this.acivatedRoute.params.subscribe(res => {
       this.productSlug = res.slug;
       this.categoryId = res.category_id;
       this.productCatResponse = this.categoryId; 
       this.humanize(this.productSlug);
       this.fetchProductCategories(this.categoryId);
    });
  }

  ngDoCheck() {
    this.attributes = this.wordpress.allAttributes;
    this.attributeOptions = this.wordpress.attributeOptions;
    this.productCategories = this.wordpress.productCatList;
  }

  fetchProductCategories(catId) {
    this.wordpress.fetchCategoryProducts(catId)
      .subscribe(products => {
        this.products = products;
        this.spinnerEnabled = false;
        console.log('home data' + products);
      }), (error) => console.log(error);
  }

  openModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  /* To humanize the title of the category */
  humanize(str) {
    var frags = str.split('-');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    this.categoryName = frags.join(' ');
  }

  /* search result only for product category  */
  getProductCategory() {
    console.log('In get category function');
    console.log("this is the event");
    for (let i = 0; i < this.productCategories.length; i++) {
      if (this.productCatResponse == this.productCategories[i].id) {
        this.productCatSlug = this.productCategories[i].slug;
        this.humanize(this.productCatSlug);
        this.productCatName = this.productCategories[i].name;
      }
    }
    if (this.productCatResponse) {
      this.router.navigateByUrl('/product-category/' + this.productCatSlug + '/' + this.productCatResponse);
    }
  }

  getProductAttribute() {
   this.spinnerEnabled = true;
    if (typeof this.productCatResponse != "undefined" && this.productCatResponse != null) {
      for (let i = 0; i < this.productCategories.length; i++) {
        if (this.productCatResponse == this.productCategories[i].id) {
          this.productCatSlug = this.productCategories[i].slug;
          this.productCatName = this.productCategories[i].name;
        }
      }

      this.customService.filterProducts(this.productCatSlug, this.attributeResponse)
        .subscribe((response) => {
          console.log('searched response' + response);
          let data;
          data = response;
          if (data != null) {
            this.products = data;
            data.attResponse = this.attributeResponse;
            data.catTitle = this.productCatSlug;
          } else {
            this.products = false;
          }

          this.spinnerEnabled = false;
          
        },
          (error) => {
            this.spinnerEnabled = false;
            console.log('error in getting variations for this product');
            console.log(error);

          });

    } else {
        console.log('In else condition of searched products');
      this.spinnerEnabled = false;
    }
    
  }

  refresh() {
    console.log("before empty");
    console.log(this.attributeResponse);
    console.log("In refresh");
    this.attributeResponse = {};
    console.log(this.attributeResponse)
  }


}
