import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:44328';

  formModel = this.fb.group({
    UserName: [''],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/api/Account/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/api/Account/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/api/Employee/Index');
  }

  roleMatch(allowedRoles):boolean{
    var isMatch =false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])); 
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch=true;
        return false;
      }
    })
    return isMatch;
  }
}
