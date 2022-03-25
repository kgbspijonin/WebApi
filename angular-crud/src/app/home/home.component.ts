import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import axios from 'axios';
import {FormsModule} from '@angular/forms';
import { User } from './user';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  static Instance : HomeComponent

  public static GetInstance() : HomeComponent {
    return HomeComponent.Instance;
  }

  public loggedIn : boolean = false

  public IsLogged() : boolean {
    return this.loggedIn;
  } 

  user: User = new User()

  constructor(
    private route: ActivatedRoute) {
    HomeComponent.Instance = this
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
      axios.get(`https://localhost:7152/Users/Login?username=${this.user.username}&password=${this.user.password}`).then( response => { 
        if(response.status == 200) {
          this.loggedIn = true
          this._userName = this.user.username;
        }
      }).catch (error => {
        this.loggedIn = false
        this._userName = "Incorrect username or password";
      })
  }

  logout(): void {
    this.loggedIn = false;
    this._userName = '';
  }

  register(): void {
    this.loggedIn = false
    let url = '';
    this._userName = `Successfully registered, ${this.user.username}`
    url = `https://localhost:7152/Users/Register`;
    axios.post(url, this.user);
  }
}
