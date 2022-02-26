import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed!: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.isMenuCollapsed = true;
  }

  onClickOption(): void {
    this.isMenuCollapsed
  }

}