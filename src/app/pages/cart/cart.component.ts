import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  total = 0;
  products:any;

  constructor(private cart:CartService) {}

  ngOnInit(){
    this.getCart()
  }

  getCart(){
    this.cart.cart().subscribe(res=>{
      this.total = res.total_cart;
      this.products = res.products
    })
  }

  deleteCart(id:number){
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
