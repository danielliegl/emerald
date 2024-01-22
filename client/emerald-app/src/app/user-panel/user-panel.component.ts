import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../users/users.services";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public userService: UserService) { }

  ngOnInit(): void {
  }

  getUsers(){
    this.http.post('../.netlify/functions/get_users', null).subscribe((response) => {
      console.log(response)
    })
  }

}
