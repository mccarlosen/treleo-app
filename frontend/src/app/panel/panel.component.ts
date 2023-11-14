import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../types/user';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
	isAuthenticated: boolean = false;
	user$!: Observable<User>

	constructor(
		private authService: AuthService,
		private cookieService: CookieService,
		private router: Router
	) {}

	logout() {
		this.authService.logout().subscribe({
			next: (rs) => {
				if (rs.response == 'success') {
					this.cookieService.delete('treleo_auth')
					this.isAuthenticated = false
					this.router.navigate(['/login'])
				}
			},
			error: (error) => {
				console.log(error);
			}
		})
	}

	ngOnInit() {
		this.isAuthenticated = this.authService.isAuthenticated()
		this.user$ = this.authService.getUserAuthenticated()
	}
}
