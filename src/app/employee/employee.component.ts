import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public employeeForm: FormGroup;
  public submitted = false;
  private employee: Employee = new Employee();

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.employeeForm = this.fb.group({
      ultimatix: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      birthDate: ['', [Validators.required]]
    });
  }

  getErrorMessage() {
    console.log(this.employeeForm.controls.name);
  }

  get f() { return this.employeeForm.controls; }

  save() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.employeeForm.invalid) {
        return;
    }
    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.employeeForm.value))
    this.setObjectEmployee(this.employeeForm);
    //console.log(JSON.stringify(this.employee));
    this.employeeService.create(this.employee);
    //console.log(this.employeeService.create(this.employee));
  }

  private setObjectEmployee(employeeForm: FormGroup) {
    this.employee.ultimatix = employeeForm.value.ultimatix;
    this.employee.identification = employeeForm.value.identification;
    this.employee.name = employeeForm.value.name;
    this.employee.lastName = employeeForm.value.lastName;
    this.employee.birthDate = employeeForm.value.birthDate;
  }

}
