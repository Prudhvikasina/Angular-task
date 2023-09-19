import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit{
  employeeForm: FormGroup;
  employees:any[]=[];
  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar,) {
    this.employeeForm = this.fb.group({
      Id: ['', Validators.required],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Mobile: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Address: ['', Validators.required],
      Address2: ['', Validators.required],
      TaskId: ['', Validators.required],
      TaskStartDate: ['', Validators.required],
      TaskEndDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.employees = JSON.parse(localStorage.getItem('PeriodicElement'));
  }
  onSubmit() {
    console.log(this.employeeForm.value);
      this.employees.push(this.employeeForm.value);
      localStorage.setItem('PeriodicElement', JSON.stringify(this.employees));
      this._snackBar.open('Details Added successfully', 'Got it !', {
      
      });
  }
  
}
