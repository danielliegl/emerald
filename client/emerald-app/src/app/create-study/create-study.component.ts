import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, FormControl, FormBuilder, Form, FormGroup} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { NgZone } from '@angular/core';

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
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class CreateStudyComponent implements OnInit {
  public userList: any[] = [];
  createStudyForm: FormGroup;


  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fetchUsers()
    this.createStudyForm = this.fb.group({
      name: '',
      public: true,
      description: "",
      assignedUsers: [],
      requirements: [],
    })
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