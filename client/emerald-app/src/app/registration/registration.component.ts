import { Component, OnInit } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {RegistrationService} from "../registration.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  imports: [
    MatCardModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    FormsModule
  ]
})
export class RegistrationComponent implements OnInit {
  username: string;
  password: string;

  constructor(private registrationService: RegistrationService) { }

  registerUser(username: string, password: string): void {
    this.registrationService.registerUser(username, password).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        // Handle successful registration
      },
      (error) => {
        console.error('Registration error:', error);
        // Handle registration errors
      }
    );
  }

  ngOnInit(): void {
  }

}
