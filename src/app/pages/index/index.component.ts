import { Component } from '@angular/core';
import { HomeService } from '../../Services/home.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  categories:any = [];
  bottomCategories:any;

  constructor(private home :HomeService){}

  ngOnInit()
  {
    this.home.topCategory().subscribe(res=>{
      this.categories = res.data
    })
    this.home.category().subscribe(res=>{
      this.bottomCategories = res.data;
    })
  }
}
