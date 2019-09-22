import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {  AuthService  } from '../../../@service/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../user.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  errorMsg:string='';
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
     ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
          console.log (data);
        },
        error => {
          this.errorMsg = error.error || error.statusText;
          console.log(error);
        });
  }


}
