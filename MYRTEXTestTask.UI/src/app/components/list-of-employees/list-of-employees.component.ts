import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { isBefore} from 'date-fns';

@Component({
  selector: 'app-list-of-employees',
  templateUrl: './list-of-employees.component.html',
  styleUrls: ['./list-of-employees.component.css']
})
export class ListOfEmployeesComponent implements OnInit, AfterViewInit {

  employees: Employee[] = [];
  employeeToEdit: Employee = new Employee;

  displayedColumns: string[] = ['department', 'fullName', 'dateOfBirth', 'dateOfEmployment','salary','edit'];
  dataSource = new MatTableDataSource(this.employees);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .subscribe((result: Employee[]) => (this.dataSource.data = result));
  }

  updateEmployeeList(employees: Employee[]) {
    this.dataSource.data = employees;
  }

  initNewEmployee() {
    this.employeeToEdit = new Employee();
  }

  editEmployee(employee: Employee) {
    this.employeeToEdit = employee;
  }

  deleteEmployeesAbove70YearsOld(){
    this.employeeService
    .deleteEmployeesAbove70YearsOld()
    .subscribe((result: Employee[]) => {this.dataSource.data = result});
  }

  updateSalaries(){
    this.employeeService
    .updateSalaries()
    .subscribe((result: Employee[]) => {this.dataSource.data = result});
  }

  applyFilter(event: Event, columnName: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      if (typeof data[columnName] === 'string')
        return data[columnName].toLowerCase().indexOf(filter) !== -1;
      else
        return data[columnName] > filterValue;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterDate(event: MatDatepickerInputEvent<Date>, columnName: string) {
    const filterDate = event.value;

    if (filterDate) {

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const dob = data[columnName];
        if (!dob) return false;
        const bdDate = new Date(dob);
        return isBefore(filterDate,bdDate);
      };
      this.dataSource.filter = "dateOfBirth";
    } else {
      this.dataSource.filterPredicate = (data: Employee, filter: string) => {
        return true;
      };
      this.dataSource.filter = "";
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}