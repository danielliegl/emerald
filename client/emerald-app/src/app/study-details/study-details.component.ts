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
    this.loadScript();
  }

  loadScript() : void {
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
  hasValidated(item: any): boolean  {
    return (item.values.length ===  0);
  }
  evaluationSuccess(item: any): any  {
   if(item.values.length > 0) {
     if(item.values[0].value === true) {
       return true;
     }
   }
  }
  evalutionFailure(item: any): any  {
    if(item.values.length > 0) {
      if(item.values[0].value === false) {
        return true;
      }
    }
  }
  openConfirmationDialog(item: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Does this criteria work as expected?' },
    });
    let indexOfItem = this.study.requirements.indexOf(item);
    dialogRef.afterClosed().subscribe(result => {
      if (result === "true") {
        const script = {
          id: this.itemId.toString(),
          requirement: {
            index: indexOfItem,
            name: item.name,
            value: true
          }
        }
        this.http.post('../.netlify/functions/edit_requirement_value', script).subscribe((response) => {
          console.log(response);
          this.ngOnInit();
        })
      } else if(result === "no") {
        const script = {
          id: this.itemId.toString(),
          requirement: {
            index: indexOfItem,
            name: item.name,
            value: false
          }
        }
        this.http.post('../.netlify/functions/edit_requirement_value', script).subscribe((response) => {
          console.log(response);
          this.ngOnInit();
        })
        // User clicked "No" or closed the dialog
        // Implement your logic here
      }
      else {
        console.log("cancelled");
      }
    });
  }
}
