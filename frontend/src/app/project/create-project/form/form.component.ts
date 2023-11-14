import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class CreateProjectFormComponent {
	generalError: string = ''
	generalErrorList: Array<string> = []
	loading: boolean = false

	constructor(
		private projectService: ProjectService,
		private toastr: ToastrService,
		private router: Router
	) {
	}

	projectForm = new FormGroup({
		title: new FormControl('', [
			Validators.required,
			Validators.maxLength(150)
		]),
		description: new FormControl('', [
			Validators.maxLength(250)
		]),
	})

	get title() {
		return this.projectForm.get('title')
	}

	get description() {
		return this.projectForm.get('description')
	}

	onSubmit() {
		if (this.projectForm.valid) {
			const { title, description } = this.projectForm.value
			this.projectService.storeProject(title!, description!).subscribe({
				next: (rs) => {
					this.toastr.success('El proyecto se ha guardado correctamente.')
					this.router.navigate(['/projects'])
				},
				error: (error) => {
					this.generalErrorList = []
						const errorJson = error.error
						if (error.status == 404) {
							this.generalError = errorJson.message
						}
						if (error.status == 422) {
							if (errorJson.message == 'E_VALIDATION_FAILURE: Validation Exception') {
								const data = errorJson.data
								data.messages.errors.forEach((item: { message: string; }) => this.generalErrorList.push(item.message))								
							} else {
								this.generalError = errorJson.message
							}
						}
						this.loading = false
				},
			})
		}		
	}
}
