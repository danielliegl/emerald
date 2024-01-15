import {Component, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = new FormControl("")
  password = new FormControl("")

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }


  handleLogin(){
    const loginData = {
      username: this.username.value,
      password: this.password.value
    }

    this.http.post("/.netlify/functions/login", loginData)
      .subscribe(
        (response) => {
          if(response['admin'])
          {
            this.router.navigateByUrl("/admin")
          }
          else
          {
            //TODO: change route to user panel
            this.router.navigateByUrl("/")
          }
        },
        (error) => {
          console.error(error)
        }
      )
  }

}
