import { Component, OnInit } from '@angular/core';
import {RegisterService } from '../../../@service/register.service'
import { User } from 'src/app/@models/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'email', 'role'];
  users:User
  dataSource =this.users;
  constructor(
    private registerService:RegisterService
  ) { }

  ngOnInit() {
    this.registerService.getUsers().subscribe((data)=>{
        this.users=data;
    })
  }

}
