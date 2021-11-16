import { Injectable } from '@angular/core';
import { UserGet, UserList } from '../models/user.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<UserList>{
    const url = "https://reqres.in/api/users";
    return this.http.get<UserList>(url);
  }
  
  get(id: number): Observable<UserGet>{
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.get<UserGet>(url);
  }
  
  put(id: number): Observable<boolean>{
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.get<boolean>(url);
  }
}
