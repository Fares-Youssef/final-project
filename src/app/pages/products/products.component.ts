import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  id: any;
  products:any;

  constructor(private product: ProductService, private activated: ActivatedRoute,private router : Router) {
  }

  ngOnInit() {
    this.activated.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.product.products(this.id).subscribe(res=>{
        console.log(res);
        this.products = res.data
      })
    });
  }
}
