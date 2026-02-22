import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
  return this.http.post<any>(`${this.apiUrl}/login`, {
    email,
    password,
  }).pipe(
    tap(res => {
      localStorage.setItem('token', res.access_token);
    })
  );
}

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
