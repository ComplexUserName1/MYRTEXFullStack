import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  private _employee?: Employee;
  employeeCopy?: Employee;

  @Input()
  set employee(value: Employee | undefined) {
    this._employee = value;
    this.employeeCopy = value ? { ...value } : undefined;
  }
  get employee(): Employee | undefined {
    return this._employee;
  }
  @Output() employeesUpdated = new EventEmitter<Employee[]>();

  showAlert: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  updateEmployee(employeeCopy: Employee) {
    this.employeeService
      .updateEmployee(employeeCopy)
      .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees),
      
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.showAlert = true;
        }
      });
  }

  deleteEmployee(employeeCopy: Employee) {
    this.employeeService
      .deleteEmployee(employeeCopy)
      .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
  }

  createEmployee(employeeCopy: Employee) {
    if (employeeCopy.salary < 0) {
      this.showAlert = true;
      return;
    }
    
    this.employeeService
      .createEmployee(employeeCopy)
      .subscribe(
        (employees: Employee[]) => this.employeesUpdated.emit(employees),

        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.showAlert = true;
          }
        }
      );
  }
}