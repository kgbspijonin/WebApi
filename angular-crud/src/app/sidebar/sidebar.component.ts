import {Component} from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {  
  public IsLogged() {
    return HomeComponent.GetInstance().IsLogged()
  }
}
