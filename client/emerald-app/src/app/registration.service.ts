import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = '/.netlify/functions-serve';

  constructor(private http: HttpClient) { }

  registerUser(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log(body);
    return this.http.post<any>(`${this.apiUrl}/register`, body);
  }
}
