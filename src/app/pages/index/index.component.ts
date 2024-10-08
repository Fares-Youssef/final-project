import { Component } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  categories: any = [];
  bottomCategories: any;

  constructor(private home: HomeService, private global: GlobalService) {
    this.global.loaded = false
  }


  ngOnInit() {
    this.home.topCategory().subscribe(res => {
      this.categories = res.data
    })
    this.home.category().subscribe(res => {
      this.bottomCategories = res.data;
    }, (err) => { }, () => {
      this.global.loaded = true
    })
  }

}
