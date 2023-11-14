import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserCredentials } from '../types/user-credentials';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
	generalError: string = ''
	generalErrorList: Array<string> = []
	loading: boolean = false
	loginForm = new FormGroup({
		username: new FormControl('', [
			Validators.required,
			Validators.email
		]),
		password: new FormControl('12345678', [
			Validators.required
		])
	})

	constructor (
		private router: Router, 
		private cookieService: CookieService,
		private authService: AuthService
	) {}

	onSubmit() {
		this.generalError = ''
		if (this.loginForm.valid) {
			this.loading = true
			const {username, password} = this.loginForm.value
			const credentials: UserCredentials = {
				username: username || '',
				password: password || '',
			}
			this.authService.doLogin$(credentials)
				.subscribe({
					next: (rs) => {
						if (rs.response == 'success' && rs.data?.token != '') {
							this.cookieService.set('treleo_auth', rs.data.token, rs.data.expiresIn)
							this.router.navigate(['/projects'])
						}
						
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
					complete: () => {
						this.loading = false
					}
				})
		}
	}

	get username() {
		return this.loginForm.get('username')
	}

	get password() {
		return this.loginForm.get('password')
	}
}
