import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Shops} from '../@models/shop'

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  Url:string='http://localhost:4000/shop';
  headers:HttpHeaders =new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  createShop(shop:Shops): Observable<any> {
    let url = `${this.Url}/create`;
    return this.http.post(url,shop);
  }
  getShops(userid):Observable<any> {
    return this.http.post(`${this.Url}`,{UserID:userid});
  }
  getShop(_id): Observable<any> {
    let url = `${this.Url}/read/${_id}`;
    return this.http.get(url, { headers: this.headers });
  }
  updateShop(_id, shop): Observable<any> {
    let url = `${this.Url}/update/${_id}`;
    console.log(shop);
    return this.http.put(url, shop, { headers: this.headers });
    
  }
  deleteShop(_id): Observable<any> {
    let url = `${this.Url}/delete/${_id}`;
    return this.http.delete(url, { headers: this.headers });
  }
  SubscribeShop(shopId,userid,role): Observable<any> {
    let url = `http://localhost:4000/rel/create`;
    return this.http.post(url,{'UserID':userid,'ShopID':shopId,'shopRole':role} ,{ headers: this.headers });
  }

  getSubscribe(userid): Observable<any> {
    let url = `http://localhost:4000/rel/getSubscribtion`;
    return this.http.post(url,{'UserID':userid} ,{ headers: this.headers });
  }
  updateSubscribe(relid,role): Observable<any> {
    let url = `http://localhost:4000/rel/update/${relid}`;
    return this.http.put(url,{'shopRole':role} ,{ headers: this.headers });
  }
}
