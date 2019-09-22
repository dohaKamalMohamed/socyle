import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../shops/shops.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/@service/shop.service';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  errorMsg:string='';
  constructor(public dialogRef: MatDialogRef<AddShopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private shopService:ShopService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      imgURL: ['', Validators.required],
      contnent: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.shopService.createShop(this.form.value)
      .subscribe(
        data => {
          console.log(data);
          if(this.router.url.includes('shops'))
          {
            this.router.navigate(['/home/shop'])
          }
          else
          {
            this.router.navigate(['/home/shop'])
          }
        },
        error => {
          this.errorMsg = error.error || error.statusText;
          console.log(error);
        });
        this.onNoClick();
  }
 
}
