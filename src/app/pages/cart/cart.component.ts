import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import Swal from 'sweetalert2';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  total = 0;
  products:any;

  constructor(private cart:CartService, private global: GlobalService) {
    this.global.loaded = false
  }

  ngOnInit(){
    this.getCart()
  }

  getCart(){
    this.global.loaded = false
    this.cart.cart().subscribe(res=>{
      this.total = res.total_cart;
      this.products = res.products
    }, (err) => { }, () => {
      this.global.loaded = true
    })
  }

  deleteCart(id:number){
    this.global.loaded = false
    this.cart.deleteCart(id).subscribe(res=>{
    this.getCart()
      Swal.fire({
        title: 'Success!',
        text: res.message,
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      })
    })
  }

}
