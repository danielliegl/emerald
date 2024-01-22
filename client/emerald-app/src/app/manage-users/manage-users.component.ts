import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import def from 'ajv/dist/vocabularies/discriminator';
import * as Chartist from 'chartist';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, UserInfo } from './users';
import { response } from 'express';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
// import { UserInfo } from 'app/models/userinfo';
import { UserService } from './manage-users.services';

// Imports for the Table
import {MatPaginator} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { AppRoutingModule } from 'app/app.routing';
import {MatCheckboxModule} from '@angular/material/checkbox'



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AppRoutingModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  // public USERS: UserInfo[] = [
  //   {
  //       id: 1,
  //       username: 'Franz',
  //       password: 'asdf',
  //       admin: false
  //   },
  //   {
  //     id: 2,
  //     username: 'Manfred',
  //     password: 'eicncnei',
  //     admin: true
  //   },
  //   {
  //     id: 3,
  //     username: 'Bert',
  //     password: 'ibinsdabert3',
  //     admin: false
  //   },
  //   {
  //     id: 4,
  //     username: 'Gerhard',
  //     password: 'gerhardgoeshard4real',
  //     admin: true
  //   },
  // ]

  checked = true;

  public UserArray: UserInfo[] = []
  public newUser: UserInfo

  // Data Source for dynamic Table dispaly
  dataSource = new MatTableDataSource<UserInfo>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;

  // The Columns needed to display in the Registered Users Table.
  // columnsToDisplay = ['id', 'username', 'admin']
  // columnsToDisplay = ['id', 'username', 'admin', 'edit', 'delete']
  columnsToDisplay = ['id', 'username', 'admin', 'delete']

  user: User;
  users: User[] = [];
  [x: string]: any;

  @ViewChild('targetCell') targetCell!: ElementRef;
  
  constructor(private http: HttpClient, private router: Router, public userService: UserService) { }


  addUserForm = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    admin: new FormControl(false, [Validators.required]),
  })

  ngAfterViewInit() {
    // Call the get_users.js and updates thes dataSource.
    this.getUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    // this.dataSource = this.USERS;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  
  registerUser() {
    const url = '../.netlify/functions/register';
    const newUsersArray = this.UserArray;

    const body = {
      username: this.addUserForm.get('username').value,
      password: this.addUserForm.get('password').value,
      admin: this.addUserForm.get('admin').value
    }
    
    // the new user to be regestered.
    this.newUser = {
      id: this.addUserForm.get('id').value,
      username: this.addUserForm.get('username').value,
      password: this.addUserForm.get('password').value,
      admin: this.addUserForm.get('admin').value
    }
    
    // this.USERS.push(this.newUser)
    // refresh the Table and update the new Data
    // this.dataSource.data = this.USERS;
    // this.USERS = [...newUsersArray]
    // console.log(this.newUser)
    // console.log(this.USERS)

    this.http.post<any>(url, body)
      .subscribe(
        (response) => {
          console.log(response)
        }
      )
    this.getUsers()
  }

  // getUsers(): 
  getUsers(){
    const body: UserInfo [] = []
    const url = '../.netlify/functions/get_users';
    this.http.post(url, body).subscribe(response => {
      // get the values of the response
      var user_array = Object["values"](response)
      // debugging
      user_array.forEach(element => {
        console.log(element)
      });
      this.dataSource.data = user_array;
      console.log(this.dataSource.data)
    })
    
  }

  // Deletes Users
  deleteUser(user_id){
    const url = '../.netlify/functions/delete_user';
    console.log(user_id)
    this.http.post(url, user_id).subscribe(response => {
      console.log('DELETE LOG')
      console.log(response)
    })
    this.getUsers()
  }

  filterProduct(value: string):void{
    this.dataSource.filter = value.trim().toLowerCase();
    this.serviceAPI.getDataByFilter(value).subscribe(response =>
    {
      console.log(response)
      this.dataSource= response;
    });
  }

}