import { Injectable } from '@angular/core';
import { User, UserGet, UserList } from '../models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(page: number): Observable<UserList>{
    const url = `https://reqres.in/api/users?page=${page}`;
    return this.http.get<UserList>(url);
  }
  
  get(id: number): Observable<UserGet>{
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.get<UserGet>(url);
  }
  
  put(user: User): Observable<any>{
    const url = `https://reqres.in/api/users/${user.id}`;
    return this.http.put(url, user);
  }
}
