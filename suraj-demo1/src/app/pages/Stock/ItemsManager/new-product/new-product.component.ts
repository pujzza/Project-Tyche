import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  sampleItem = ['item1','item2','item3']
  constructor() { }

  ngOnInit(): void {
  }

}
