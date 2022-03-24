import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import axios from 'axios';
import {FormsModule} from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  loggedIn : boolean = false

  public IsLogged() : boolean {
    return this.loggedIn;
  } 

  user: User = new User()

  constructor(
    private route: ActivatedRoute) {
  }

  _userName: string = '';

  ngOnInit() {
    this.user.username = ''
    this.user.password = ''
  }

  get userName(): string {
    return this._userName;
  }

  login(): void {
    this.loggedIn = false
      axios.get(`https://localhost:7152/Users/Login?username=${this.user.username}&password=${this.user.password}`).then( response => { 
        if(response.status == 200) {
          this.loggedIn = true
          this._userName = this.user.username;
        }
      }).catch (error => {
        this._userName = "Incorrect username or password";
      })
  }

  logout(): void {
    this._userName = '';
  }
}
