import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterService} from '../../../@service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../user.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  errorMsg:string='';
  constructor(
    private fb: FormBuilder,
    private registerService:RegisterService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName:['', Validators.required],
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

    this.registerService.register(this.form.value)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMsg=error.error || error.statusText;
          console.log(error);
        });
  }

}
