import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { GlobalService } from '../../Services/global.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent {

  product: any;
  id: any;
  activeImageIndex: number = 0;
  colors:any = [];
  related:any;
  main_image:any = 'images/download.png';
  quantity: number = 1;
  addCart = {
    product_id: 0,
    qty: 0,
    is_collage: 0,
    is_offer: 0
  }

  constructor(private products: ProductService, private activated: ActivatedRoute,private router : Router, private cart: CartService, private global: GlobalService) {
  }

  ngOnInit() {
    this.activated.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.products.singleProduct(this.id).subscribe(res => {
        if (res.data[0]) {
          this.product = res.data[0];
        this.colors = [];
        this.product.attributes[0].variations.forEach((element:any) => {
          let object = {
            name: element.name,
            value: "#" + element.hex_color.slice(4)
          }
          this.colors.push(object)
        });
        this.related = this.product.similar_products
        this.main_image = this.product?.gallery[0].name
        }else{
          this.router.navigateByUrl('**')
        }
      });
    });
  }

  addToCart() {
    if (this.global.is_login) {
      this.addCart.product_id = this.id
      this.addCart.qty = this.quantity
      this.cart.addToCart(this.addCart).subscribe(res => {
        Swal.fire({
          title: 'Success!',
          text: res.message,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        })
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please Login First',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
      this.router.navigateByUrl('/login');
    }
  }

  changeImage(index: number,src:any) {
    this.main_image = 'images/download.png'
    setTimeout(() => {
      this.main_image = src
    } ,100)
    this.activeImageIndex = index;
  }

  selectedSize: string = 'M';

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
