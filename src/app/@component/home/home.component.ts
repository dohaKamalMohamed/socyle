import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../@service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/@models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser:User;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser.userName)
   }

  ngOnInit() {
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
    }

}
