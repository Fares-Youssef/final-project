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

  toggleSubCategories(category: any) {
    category.isOpen = !category.isOpen;
  }

  ngOnInit()
  {
    this.home.topCategory().subscribe(res=>{
      res.data.forEach((element:any) => {
        let object = {
          id:element.id,
          name: element.name,
          subCategories : element.subcategories,
          isOpen: false
        }
        this.categories.push(object)
      });
    })
    this.home.category().subscribe(res=>{
      this.bottomCategories = res.data;
    })
  }
}
