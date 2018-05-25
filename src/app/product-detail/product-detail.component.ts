import { Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import { WordpressService } from '../services/wordpress.service';
import { CustomService } from '../services/custom.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CartService } from '../services/cart.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  cartData: any;
  spinnerEnabled = true;
  variable: any;
  variationId: any;
  updatedPrice: any = false;
  productSlug: any;
  productId: any;
  product: any;
  modalRef: BsModalRef;
  variationsData: Array<any> = [];
  selectedUpsellProducts: any = [];
  checkUpsell: any = [];
  constructor(public wordpress: WordpressService, public acivatedRoute: ActivatedRoute,
    public modalService: BsModalService, public customService: CustomService, public cartService: CartService
    ,public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.spinnerEnabled = true;
    this.acivatedRoute.params.subscribe(res => {
      this.productSlug = res.slug;
      this.productId = res.id;
      this.showProductDetails(this.productId);
    });
  }

  showProductDetails(productId) {
    this.wordpress.fetchProductDetail(productId)
      .subscribe(product => {
        this.product = product;
        this.spinnerEnabled = false;
      }), (error) => console.log(error);
  }

  openModel(template: TemplateRef<any>) {
   
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    
  }

  /* To add upsell products in an array (selectedUpsellProducts) */
  addedProduct(element, product) {
    // element.textContent = text;
    element.disabled = true;
    this.selectedUpsellProducts.push(product);
    this.checkUpsell[product.id] = true;
    console.log('Array of upsell products');
    console.log(this.selectedUpsellProducts);
  }

  /* Remove upsell product from the selectedUpsellProducts array */
  removeProduct(element, product) {
    element.disable = false;
    this.selectedUpsellProducts.splice(product);
    this.checkUpsell[product.id] = false;
    console.log("removed array");
    console.log(this.selectedUpsellProducts);

  }

  /* Get the price of with variable specifications */
  getProductVariations() {
    console.log('In get product variation');
    console.log('In getting variation data');
    console.log(this.variationsData);
    console.log(typeof this.variationsData);

    // if(this.variationLength >0){
    // this.variationLength = Object.keys(this.variationsData).length;
    this.customService.getProductVariation(this.variationsData, this.product.slug, this.productId)
      .subscribe((response) => {
        let data : any;
        data = response
        this.updatedPrice = data.price_html;
        console.log('data from variation' + data);
        this.variationId = data.variation_id;
        this.product.price = data.display_price;
        this.variable = data.attributes;
        if(data) {
          this.product.variations = false;
        }
        console.log('success in getting variations for this product');
      },
        (error) => {
          console.log('error in getting variations for this product');
        });
  }

  addProductToStorage() {
    this.cartData = this.cartService.cartItems;
    console.log('Array of variation data' + this.variationsData);
    if(!this.cartData || this.cartData == null) {
      this.cartData = [];
      this.cartData.push({
        "name": this.product.name,
        "quantity": 1,
        "image": this.product.images[0].src,
        "price": parseFloat(this.product.price),
        "amount": parseFloat(this.product.price),
        "product_id": this.product.id,
        "variation_id": this.variationId ? this.variationId : "",
        "variation": this.variationsData ? this.variable : "",
        "forcell_products": this.product.force_sell_product_info,
        "variationArray": Array.of(this.variationsData)
      })
      this.toastr.success('Item added to cart!', 'Success!');
    } else {
      console.log('In else case');
      let added = 0;
        for (let i = 0; i < this.cartData.length; i++) {
          if (this.product.id == this.cartData[i].product_id && this.variationId == this.cartData[i].variation_id) {
            let quantity = this.cartData[i].quantity;
            console.log("Product is already in the cart");
            this.cartData[i].quantity = quantity + 1;
            this.cartData[i].amount = parseFloat(this.cartData[i].amount) + parseFloat(this.cartData[i].price);
            added = 1;
          }
        }
      if (added == 0) {
        this.cartData.push({
          // "product": product,
          "name": this.product.name,
          "quantity": 1,
          "image": this.product.images[0].src,
          "price": parseFloat(this.product.price),
          "amount": parseFloat(this.product.price),
          "product_id": this.product.id,
          "variation_id": this.variationId ? this.variationId : "",
          "variation": this.variationsData ? this.variable : "",
          "forcell_products": this.product.force_sell_product_info,
          "variationArray": Array.of(this.variationsData)
        })
        
      } 
      this.toastr.success('Item added to cart!', 'Success!');
    }
    
    this.cartService.cartItems = this.cartData;
    console.log('cart updated');
    console.log('data after updationg cart' + this.cartData);

    if (this.selectedUpsellProducts.length > 0) {
      this.selectedUpsellProducts.forEach((upsell, index) => {
        this.cartData.push({
          "name": upsell.name,
          "quantity": 1,
          "image": this.product.images[0].src,
          "price": parseFloat(upsell.price),
          "amount": parseFloat(upsell.price),
          "product_id": upsell.id,
        })
      })
      console.log('Added upsell products');
      this.cartService.cartItems = this.cartData;
    }
  }
  
}
