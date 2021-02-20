import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   query:boolean;
   url:string;
  constructor(private http:HttpClient) { 
    this.query=false;
    this.url="api/";
  }

  BackendPosts(Args):Observable<any>{
    console.log(Args);
    // const params=new HttpParams({fromString:Args);
     return this.http.post(`${this.url}/?query=${Args}`,Args);
    // return this.http.post(`${this.url}`,Args);
  }
}
