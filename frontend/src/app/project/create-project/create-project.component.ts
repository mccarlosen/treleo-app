import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectFormComponent } from './form/form.component';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, CreateProjectFormComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
	

}
