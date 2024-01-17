import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { User, UserInfo } from './users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  saveUserOld(user: User) {
    console.log('HEY');
    const url = '../.netlify/functions/get_users';
    this.http.post<any>(url, user)
      .subscribe(
        (response) => {
          console.log(response)
        }
      )
        
  }

  public saveUserTyped(user: User): Observable<UserInfo> {
    console.log('HEY');
    const url = '../.netlify/functions/get_users';
    return this.http.post<UserInfo>(url, user);
  }
}