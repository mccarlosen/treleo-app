import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../types/project';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {
	@Input() project!: Project

	ngOnInit() {
		// console.log(this.project);
	}
}
