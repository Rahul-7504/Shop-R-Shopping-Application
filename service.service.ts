import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  // service.service.ts
login(data: any,): Observable<any> {
  return this.http.post('http://localhost:3000/students/login', data).pipe(
      tap((response: any) => {
          if (response.token) {
              // Store the token in local storage
              localStorage.setItem('jwtToken', response.token);
          }
      })
  );
}
// service.service.ts
getUserData(): Observable<any> {
  const token = localStorage.getItem('jwtToken');
  const headers = { Authorization: `${token}` }; // Attach token to request header

  return this.http.get('http://localhost:3000/students/user-data', { headers });
}
register(data: any): Observable<any> {
  return this.http.post(`'http://localhost:3000/students/register`, data);
}

}
