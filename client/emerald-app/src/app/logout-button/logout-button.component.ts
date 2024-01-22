import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from 'app/login/login.component';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.handleLogout()
  }

  handleLogout(): void {
    this.http.get("/.netlify/functions/logout")
    location.href = '#/login';
  }

}
