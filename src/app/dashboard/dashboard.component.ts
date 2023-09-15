import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';

export interface PeriodicElement {
  ID: number;
  NAME: string;
  EMAIL: string;
  MOBILE: string;
  Address: string;
  Address2: string;
  TaskId: number;
  TaskStartDate: Date;
  TaskEndDate: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  details:any[]=[];
  employees:any[]=[];
  filteredDetails: any[] = [];
    constructor(private http: HttpClient,public dialog: MatDialog) {
  }
ngOnInit() {
    this.candidate_details();
  }

  candidate_details() {
    this.http.get<any[]>('../../assets/json/details.json').subscribe((data:any) => {
      this.details = data;
      localStorage.setItem('PeriodicElement',JSON.stringify(data));
    });
  }
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Mobile','Address', 'Address2', 'TaskId', 'TaskStartDate','TaskEndDate','icon','edit'];


  openDialog() {
    let dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: '80%',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(()=>{
      console.log('close event');
      this.details = JSON.parse(localStorage.getItem('PeriodicElement'));
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.details = this.details.filter((item) => {
      // Modify this filter logic based on your requirements
      return (
        item.Name.toLowerCase().includes(filterValue) ||
        item.Email.toLowerCase().includes(filterValue) ||
        item.Mobile.includes(filterValue) ||
        item.Address.includes(filterValue)
      );
    });
  }
}

