import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }




  register(data:any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data:any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  verify(data:any, token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post(`${this.apiUrl}/verify`, data, httpOptions);
  }
}
