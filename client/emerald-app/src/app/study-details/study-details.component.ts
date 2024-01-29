import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-study-details',
  templateUrl: './study-details.component.html',
  styleUrls: ['./study-details.component.scss']
})
export class StudyDetailsComponent implements OnInit {
  study: any = null;
  itemId: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private dialog: MatDialog) {}
  displayedColumns: string[] = ['name','button'];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      const scriptId = {
        id: this.itemId.toString()
      }
      this.http.post('../.netlify/functions/load_script', scriptId).subscribe((response) => {
        this.study = response;
        console.log(response);
      })
      // Use this.itemId to make your fetch request or perform other actions
    });
  }

  openConfirmationDialog(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Does this requirement work as expected?' },
    });
    console.log(item);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const script = {
          id: this.itemId.toString(),
          requirement: {
            name: item.name,
            value: true
          }
        }
        this.http.post('../.netlify/functions/edit_requirement_value', script).subscribe((response) => {
          console.log(script);
        })
        item.validated ="works";
        // User clicked "Yes"
        // Implement your logic here
      } else {
        item.validated ="fails";
        // User clicked "No" or closed the dialog
        // Implement your logic here
      }
    });
  }

}
