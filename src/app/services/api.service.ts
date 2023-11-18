import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/enquiry';
  constructor(private http: HttpClient) {}
  postRegestration(regesterObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, regesterObj);
  }
  getRegestration() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
  updateRegestration(regesterObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, regesterObj);
  }
  deleteRegestration(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }
  getRegestrationUserId(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
