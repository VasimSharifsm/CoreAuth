import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Employee } from '../_Models/employee';
import { EmployeeService } from '../_Services/employee.service';
import { Observable} from 'rxjs';
import { promise } from 'protractor';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {  
  dataSaved = false;  
  employeeForm: any;  
  allEmployees: Observable<Employee[]>;  
  allEmployee:any;
  employeeIdUpdate = null;  
  msg = null;  
  constructor(private fb: FormBuilder, private employeeService:EmployeeService) { }  
  
  ngOnInit() {  
 
    this.employeeForm = this.fb.group({  
      
      EmpName: ['', [Validators.required, Validators.minLength(4)]],  
      DateOfBirth: ['', [Validators.required]],  
      EmailId: ['', [Validators.required]],  
      Gender: ['', [Validators.required]],  
      Address: ['', [Validators.required]],  
      PinCode: ['', [Validators.required]],  
      isActive: [''],  
    });  
    this.loadAllEmployees()
  }
  loadAllEmployees() {  
   this.employeeService.getAllEmployee().subscribe(data=>{
    this.allEmployee = data;
    console.log(this.allEmployee);
    });  
  }
  onFormSubmit() {  
    this.dataSaved = false;  
    const employee = this.employeeForm.value;  
    this.CreateEmployee(employee);  
    this.employeeForm.reset();  
  }  
  loadEmployeeToEdit(employeeId: string) {  
    debugger;
    this.employeeService.getEmployeeById(employeeId).subscribe(employee=> {  
      this.msg = null;  
      this.dataSaved = false;  
      this.employeeIdUpdate = employee.id;  
      this.employeeForm.controls['EmpName'].setValue(employee.empName);  
      this.employeeForm.controls['DateOfBirth'].setValue(employee.dateOfBirth);  
      this.employeeForm.controls['EmailId'].setValue(employee.emailId);  
      this.employeeForm.controls['Gender'].setValue(employee.gender);  
      this.employeeForm.controls['Address'].setValue(employee.address);  
      this.employeeForm.controls['PinCode'].setValue(employee.pinCode);  
      this.employeeForm.controls['isActive'].setValue(employee.isActive);  
    });  
  
  }  
  CreateEmployee(employee: Employee) {  
    if (this.employeeIdUpdate == null) {  
      this.employeeService.createEmployee(employee).subscribe(  
        () => {
          this.dataSaved = true;  
          this.msg = 'Record saved Successfully';  
          this.loadAllEmployees();  
          this.employeeIdUpdate = null;  
          this.employeeForm.reset();  
        }  
      );  
    } else {  
      employee.id = this.employeeIdUpdate;  
      this.employeeService.updateEmployee(employee).subscribe(
        () => {  
        this.dataSaved = true;  
        this.msg = 'Record Updated Successfully';  
        this.loadAllEmployees();  
        this.employeeIdUpdate = null;  
        this.employeeForm.reset();  
      });  
    }  
  }   
  deleteEmployee(employeeId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.employeeService.deleteEmployeeById(employeeId).subscribe(
      () => {  
      this.dataSaved = true;  
      if(this.dataSaved==true){
        this.msg = 'Record Deleted Succefully';
      }
      
      this.loadAllEmployees();  
      this.employeeIdUpdate = null;  
      this.employeeForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.employeeForm.reset();  
    this.msg = null;  
    this.dataSaved = false;  
  }  
}  
