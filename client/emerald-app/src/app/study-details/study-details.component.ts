import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-study-details',
  templateUrl: './study-details.component.html',
  styleUrls: ['./study-details.component.scss']
})
export class StudyDetailsComponent implements OnInit {
  itemId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      const scriptId = {
        id: this.itemId.toString()
      }
      this.http.post('../.netlify/functions/load_script', scriptId).subscribe((response) => {
      console.log(response);
      })
      // Use this.itemId to make your fetch request or perform other actions
    });
  }

}
