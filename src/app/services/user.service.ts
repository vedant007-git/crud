import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  // Get all users                                                                                                                                                              
  getUsers() {
    return this.http.get(`${this.baseURL}`);
  }

  // Create a new user
  createUser(user: any) {
    return this.http.post(`${this.baseURL}/add`, user);
  }

  // Update user - DummyJSON actually supports PUT
  updateUser(id: number, user: any) {
    return this.http.put(`${this.baseURL}/${id}`, user);
  }

  // Delete user - DummyJSON supports DELETE
  deleteUser(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
