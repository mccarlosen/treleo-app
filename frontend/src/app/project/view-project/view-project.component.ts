import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../types/project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Task } from '../../types/task';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})
export class ViewProjectComponent {
  project!: Project
  tasks: Array<Task> = []
  pendingTasks: Array<Task> = []
  tasksInProgress: Array<Task> = []
  finalizedTasks: Array<Task> = []

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    const projectId = Number(this.route.snapshot.paramMap.get('project_id'))
    this.projectService.getProject(projectId).subscribe({
      next: (rs) => {
        this.project = rs.data
        this.tasks = this.project.tasks   
        
        this.pendingTasks = this.tasks.filter(task => {
          return task.status == 'Pendiente'
        })
        this.tasksInProgress = this.tasks.filter(task => {
          return task.status == 'En progreso'
        })
        this.finalizedTasks = this.tasks.filter(task => {
          return task.status == 'Completado'
        })
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  ngOnInit() {
  }
}
