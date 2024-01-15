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
import { User } from './users';
import { response } from 'express';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { UserInfo } from 'app/models/userinfo';
import { UserService } from './users.services';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: User;
  users: User[] = [];
  [x: string]: any;

  @ViewChild('targetCell') targetCell!: ElementRef;
  
  constructor(private http: HttpClient, private router: Router, public userService: UserService) { }


  addUserForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    admin: new FormControl('', [Validators.required]),
  })

  saveUser() {
    // Here this.user is undefined ERROR
    // this.user.id = this.addUserForm.get('id').value;
    // this.user.name = this.addUserForm.get('name').value;
    // this.user.password = this.addUserForm.get('password').value;
    // this.user.admin = this.addUserForm.get('admin').value;

    this.userService.saveUser(this.user).subscribe((response: any) => {
      console.log(response);
      this.users.push({ id: response.id, name: response.name, password: response.password, admin: response.admin });
    });
  }

  saveUserTyped() {

    // Here this.user is undefined ERROR
    this.user.id = this.addUserForm.get('id').value;
    this.user.name = this.addUserForm.get('name').value;
    this.user.password = this.addUserForm.get('password').value;
    this.user.admin = this.addUserForm.get('admin').value;

    this.userService.saveUserTyped(this.user).subscribe((response: UserInfo) => {
        console.log(response);
        this.users.push({id: response.id, name: response.name, password: response.password, admin: response.admin });
      });
  }

  // saveUser(user: User){
  //   this.user = this.addUserForm.value;
  //   this.userService.saveUserTyped(this.user).subscribe((response: UserInfo) => {
  //     console.log(response)

  //     this.users.push({id: response.id, name: response.name, password: response.password, admin: response.admin})
  //   });
  //   // UserService.saveUserTyped.http.post<any>('../.netlify/functions/get_users', user).subscribe((response: any) => {
  //   //   console.log(response);
  //   //   this.users.push({id: response.it, name: response.name, password: response.password, admin: response.admin});
  //   };

  // getUsers(): 
  getUsers(){
    this.http.post('../.netlify/functions/get_users', null).subscribe(response => {

    })
  }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart

      // this.startAnimationForBarChart(websiteViewsChart);
  }
}