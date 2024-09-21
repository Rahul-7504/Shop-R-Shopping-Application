import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  login(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  saveData(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/students/register', data);
  }

}
