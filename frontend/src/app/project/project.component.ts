import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, take, tap } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { ProjectItemComponent } from './project-item/project-item.component';
import { RouterLink } from '@angular/router';
import { Project } from '../types/project';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ProjectItemComponent, RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
	projectList: Array<Project> = []

	constructor(
		private projectService: ProjectService
	) {
	}

	ngOnInit() {
		this.projectService.getProjects().subscribe({
			next: (rs) => {
				if (rs.response == 'success') {
					this.projectList = rs.data
				}
			},
			error: error => {
				console.log(error);
				
			}
		})
	}
}
