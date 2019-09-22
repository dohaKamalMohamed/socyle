import { Component, OnInit } from '@angular/core';
import {ShopService} from '../../../@service/shop.service'
import { Shops } from 'src/app/@models/shop';
import {AuthService} from '../../../@service/auth.service';
import { User } from 'src/app/@models/user';
import { AddShopComponent } from '../add-shop/add-shop.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RegisterService} from '../../../@service/register.service'

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops;
  currentUser:User;
  role;
  name;
  animal;
 open:boolean=false;
  constructor(
    private shopService:ShopService,
    private authService: AuthService,
    public dialog: MatDialog,
    private registerService:RegisterService
  ) { this.authService.currentUser.subscribe(x => this.currentUser = x);}

  ngOnInit() {
  this.getShops(this.currentUser._id);  
 this.shopService.getSubscribe(this.currentUser._id).subscribe((data)=>{
     console.log(data);
 })
  }
 


  getShops(userid) {
    this.shopService.getShops(userid).subscribe((shop) => {
      this.shops=shop; 
      console.log(this.shops)
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddShopComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  delete(_id) {
    this.shopService.deleteShop(_id).subscribe((data) => {
      this.getShops(this.currentUser._id);
      console.log(data);
    })
  }
 ADDlike(shopID,role)
  {
   this.shopService.SubscribeShop(shopID,this.currentUser._id,'subscribed').subscribe((data)=>{
    console.log(data);
    this.getShops(this.currentUser._id);
   })
  }
  Updatelike(id,role){
    this.shopService.updateSubscribe(id,role).subscribe((data)=>{
         console.log(data);
         this.getShops(this.currentUser._id);
    })
  }

}


