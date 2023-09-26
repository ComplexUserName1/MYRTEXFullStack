import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'Employee';

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.put<Employee[]>(
      `${environment.apiUrl}/${this.url}`,
      employee
    );
  }

  public createEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.post<Employee[]>(
      `${environment.apiUrl}/${this.url}`,
      employee
    );
  }

  public deleteEmployee(employee: Employee): Observable<Employee[]> {
    return this.http.delete<Employee[]>(
      `${environment.apiUrl}/${this.url}/${employee.id}`
    );
  }

  public deleteEmployeesAbove70YearsOld(): Observable<Employee[]> {
    return this.http.delete<Employee[]>(
      `${environment.apiUrl}/${this.url}/70Years`
    );
  }

  public updateSalaries(): Observable<Employee[]> {
    return this.http.put<Employee[]>(
      `${environment.apiUrl}/${this.url}/Salary<15000`,
      null
    );
  }
}