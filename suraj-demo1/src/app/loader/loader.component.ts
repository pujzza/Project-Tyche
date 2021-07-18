import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  template: "<div class='loader loader-5'><span></span><span></span><span></span><span></span></div>",
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
