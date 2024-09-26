import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private products: ProductService, private activated: ActivatedRoute) {
  }

  ngOnInit() {
    this.activated.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.products.singleProduct(this.id).subscribe(res => {
        this.product = res.data[0];
        let object = {
          name: this.product.attributes[0].variations[0].name,
          value: "#" + this.product.attributes[0].variations[0].hex_color.slice(4)
        }
        this.colors.push(object)
        this.related = this.product.similar_products
        this.initializeCarousel();
      });
    });
  }

  initializeCarousel() {
    setTimeout(() => {
      $('.product__details__pic__slider').owlCarousel({
        items: 1,
        nav: false,
        dots: false,
        autoplay: false,
        mouseDrag: false,
        loop: true,
      });
    }, 100);
  }

  changeImage(index: number) {
    this.activeImageIndex = index;
    $('.product__details__pic__slider').trigger('to.owl.carousel', [index]);
  }

  quantity: number = 2;
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
