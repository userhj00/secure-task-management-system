import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from './services/tasks.service';

@Component({
  standalone: true,
  selector: 'app-pages',
  imports: [CommonModule, FormsModule],
  templateUrl: './pages.html',
  styleUrls: ['./pages.css']
})
export class PagesComponent implements OnInit {

  tasks:any[] = [];
  title = '';

  userRole = '';
  userEmail = '';

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit() {

    this.userRole = localStorage.getItem('role') || '';
    this.userEmail = localStorage.getItem('email') || '';

    this.loadTasks();
  }

  trackById(index:number,item:any){
    return item.id;
  }

  loadTasks(){
    this.tasksService.getTasks().subscribe({
      next:(res:any)=>{
        this.tasks = res.data ?? res;
      }
    });
  }

  createTask(){
    if(!this.title.trim()) return;

    this.tasksService.createTask({title:this.title})
      .subscribe(()=>{
        this.title='';
        this.loadTasks();
      });
  }

  updateStatus(task:any,status:string){
    this.tasksService.updateTask(task.id,{status})
      .subscribe(()=>this.loadTasks());
  }

  deleteTask(id:string){
    this.tasksService.deleteTask(id)
      .subscribe(()=>this.loadTasks());
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}