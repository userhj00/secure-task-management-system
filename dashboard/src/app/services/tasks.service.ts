import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TasksService {

  private API = 'http://localhost:3001/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.API);
  }

  createTask(body:any) {
    return this.http.post(this.API, body);
  }

  updateTask(id:string, body:any) {
    return this.http.patch(`${this.API}/${id}`, body);
  }

  deleteTask(id:string) {
    return this.http.delete(`${this.API}/${id}`);
  }
}