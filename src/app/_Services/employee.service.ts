import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Employee } from '../_Models/employee';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'https://localhost:44328/api/employee';
  constructor(private http: HttpClient) { }
  getAllEmployee(): Observable<Employee[]> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<Employee[]>(this.url + '/index', httpOptions);  
  }  
  getEmployeeById(employeeId: string): Observable<Employee> {  
    return this.http.get<Employee>(this.url + '/Details/' + employeeId);  
  }  
  createEmployee(employee: Employee): Observable<Employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Employee>(this.url + '/AddEmployee/',
    employee, httpOptions);  
  }  
  updateEmployee(employee: Employee): Observable<Employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Employee>(this.url + '/UpdateEmployee/',  
    employee, httpOptions);  
  }  
  deleteEmployeeById(employeeid: string): Observable<Employee> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<Employee>(this.url + '/DeleteEmployee?id=' +employeeid,  
 httpOptions);  
  }  
}
