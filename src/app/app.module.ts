import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materialModule } from './@material/@material.module';
import { LoginComponent } from './@component/user/login/login.component';
import { RegisterComponent } from './@component/user/register/register.component';
import { HomeComponent } from './@component/home/home.component';
import { AuthService } from './@service/auth.service';
import { RegisterService } from './@service/register.service';
import { ShopsComponent } from './@component/home/shops/shops.component';
import { UsersComponent } from './@component/home/users/users.component';
import { SubscribesComponent } from './@component/home/subscribes/subscribes.component';
import { UserShopsComponent } from './@component/home/user-shops/user-shops.component';
import { ShopService } from './@service/shop.service';
import { AddShopComponent } from './@component/home/add-shop/add-shop.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ShopsComponent,
    UsersComponent,
    SubscribesComponent,
    UserShopsComponent,
    AddShopComponent
  ],entryComponents: [AddShopComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService,RegisterService,ShopService],
  bootstrap: [AppComponent]

})
export class AppModule { }
