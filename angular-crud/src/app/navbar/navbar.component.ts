import {Component} from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  private sidebarVisible: boolean = false;

  constructor() {
  }

  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0];

    if (!this.sidebarVisible) {
      body.classList.add('nav-open');
      this.sidebarVisible = true;
      console.log('making sidebar visible...');
    } else {
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
}
