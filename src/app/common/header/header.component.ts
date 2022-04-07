import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed!: boolean;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isMenuCollapsed = true;
  }

  onClickOption(): void {
    this.isMenuCollapsed;
  }
}
