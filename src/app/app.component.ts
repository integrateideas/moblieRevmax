import { Component, TemplateRef, DoCheck} from '@angular/core';
import { CustomService } from './services/custom.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  total: number;
  cartData: any;
  title = 'app';
  pages: any;
  modalRef: BsModalRef;
  showEmptyCartMessage: boolean = false;

  constructor(public customService: CustomService, public modalService: BsModalService, public cartService: CartService) {
    this.parseMenu();
  }

  ngDoCheck() {
    this.cartData = this.cartService.cartItems;
    if(this.cartData) {
      this.total = 0.0;
      this.cartData.forEach((item, index) => {
        console.log('In for each of cart');
        console.log('total price before addition' + this.total);
        console.log('amount before total' + item.amount);
        this.total = this.total + item.amount;
        console.log("this is the total price");
        console.log(this.total);
        if (item.forcell_products) {
          this.total = this.total + (item.forcell_products.product_price * item.quantity);
        }
      });
    } else {
      this.showEmptyCartMessage = true;
    }
  }

  parseMenu() {
    this.customService.fetchMenuItems()
      .subscribe((response) => {
        let data: any;
        data = response;
        console.log('this is the fetched menu data' + data);
        if(data != null && typeof data != 'undefined')
        this.pages = data.items;
        console.log('Menu data' + this.pages);
      },
        (error) => {
          console.log('error in parseMenu');
          console.log(error);
        });
  }

  openModel(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  updateQuantity(item, qty) {
    for (let i = 0; i < this.cartData.length; i++) {
      if (item.product_id == this.cartData[i].product_id) {
        console.log("total price before adding anything");
        console.log(this.total);
        if (qty == "add") {
          this.cartData[i].quantity = this.cartData[i].quantity + 1;
          this.cartData[i].amount = this.cartData[i].amount + parseFloat(this.cartData[i].price);
          this.total = this.total + parseFloat(this.cartData[i].price);
          console.log("total price in case of addition");
          console.log(this.total);
        } else {
          if (this.cartData[i].quantity == 1) {
            this.cartData[i].quantity = 1;
          } else {
            this.cartData[i].quantity = this.cartData[i].quantity - 1;
            this.cartData[i].amount = this.cartData[i].amount - parseFloat(this.cartData[i].price);
            this.total = this.total - parseFloat(this.cartData[i].price);
            console.log("total price in case of substraction");
            console.log(this.total);
          }
        }
        console.log("total price before adding foresell product");
        console.log(this.total);
        if (item.forcell_products) {
          if (qty == "add") {
            console.log("In else of forsell products");
            this.total = this.total + parseFloat(this.cartData[i].forcell_products.product_price);
            console.log("total after adding forcell");
            console.log(this.total);
          } else {
            if (qty == "sub") {
              if (item.quantity == 1) {
                /* Do Nothing */
              } else {
                this.total = this.total - parseFloat(this.cartData[i].forcell_products.product_price);
                console.log("total after subtracting forcell");
                console.log(this.total);
              }
            }
          }
        }
        this.cartService.cartItems = this.cartData;
      }
    }
  }
  removeFromCart(item, i) {
    this.cartData.splice(i, 1);
    this.total = this.total - item.amount;
    if (item.forcell_products) {
      this.total = this.total - (item.forcell_products.product_price * item.quantity);
    }
    this.cartService.cartItems = this.cartData;

    if (this.cartData.length == 0) {
      this.showEmptyCartMessage = true;
    }

  }  
 
}
