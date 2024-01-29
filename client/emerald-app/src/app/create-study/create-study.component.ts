import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, FormControl, FormBuilder, Form, FormGroup, FormArray} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { NgZone } from '@angular/core';
import {UserInfo} from "../manage-users/users";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';

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
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    NgIf,
    NgForOf,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class CreateStudyComponent implements OnInit {
  dataSource = new MatTableDataSource<UserInfo>();
  public userList: any[] = [];
  private assignedUsers: any [] = [];
  private requirements: any [] = [];
  selectedDate: Date;
  createStudyForm: FormGroup;
  [x: string]: any;
  columnsToDisplay = ['id', 'username', 'button']

  constructor(private http: HttpClient, private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getUsers()
    this.createStudyForm = this.fb.group({
      name: '',
      public: true,
      description: "",
      assignedUsers: [],
      requirements: [],
      inputFields: this.fb.array([]),
    })
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    console.log('Selected date:', this.selectedDate);
  }
  getUsers(){
    const body: UserInfo [] = []
    const url = '../.netlify/functions/get_users';
    this.http.post(url, body).subscribe(response => {
      // get the values of the response
      console.log(response);
      var user_array = Object["values"](response)
      this.dataSource.data = user_array;
    })

  }

  get inputFields() {
    return this.createStudyForm.get('inputFields') as FormArray;
  }

  addInputField() {
    const newInputField = this.fb.group({
      criteria: [''] // Initialize with an empty value or provide a default value
    });
    this.inputFields.push(newInputField);
    this.changeDetectorRef.detectChanges();
    console.log(this.createStudyForm);
  }
  deleteInputField(index: number) {
    // remove an item from the FormArray at the specified index
    this.inputFields.removeAt(index);
  }
  assignUser(element: any){
    const index = this.assignedUsers.findIndex(item => item.id === element.id);
    if (index === -1) {
      // Element doesn't exist, add it
      this.assignedUsers.push(element);
    } else {
      // Element exists, remove it
      this.assignedUsers.splice(index, 1);
    }
    console.log(this.assignedUsers);
  }

  isAssigned(item: any){
    return this.assignedUsers.includes(item);
  }
  isNotAssigned(item: any){
    return !this.assignedUsers.includes(item);
  }
  filterProduct(value: string):void{
    this.dataSource.filter = value.trim().toLowerCase();
    this.serviceAPI.getDataByFilter(value).subscribe(response =>
    {
      console.log("filter")
      console.log(response)
      this.dataSource= response;
    });
  }
  public createNewProject(): void {
    const url = '../.netlify/functions/register';

    //request object has to be correctly implemented
    const body = {
      name: this.createStudyForm.get('name').value,
      description: this.createStudyForm.get('description').value,
      isPublic: true,
      assignedUsers: this.assignedUsers,
      requirements: this.inputFields.value,
      due_date: this.selectedDate,
      id:"6599afcd319a788ac3468f7x"
    }
    console.log(body);
  }

}
