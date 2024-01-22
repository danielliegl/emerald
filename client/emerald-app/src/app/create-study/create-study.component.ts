import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, FormControl} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-create-study',
  templateUrl: './create-study.component.html',
  styleUrls: ['./create-study.component.scss'],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule
  ]
})
export class CreateStudyComponent implements OnInit {
  public userList: any[] = [];
  assignedUsers = new FormControl([])


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers(){
    const url = "/.netlify/functions/get_users"

    this.http.get(url).subscribe(
      (data: any[]) => {
        // Handle the successful response here
        this.userList = data
      },
      (error) => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }

}