import { Injectable } from '@angular/core';
import { UserCredentials } from '../types/user-credentials';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../types/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
		private http: HttpClient,
		private cookieService: CookieService,
		private apiService: ApiService
	) {}

	doLogin$(credentials: UserCredentials) : Observable<any> {
		const {username, password} = credentials
		return this.http.post(`${this.apiService.baseApiUrl}/auth/login`, {
			username,
			password
		})
	}

	isAuthenticated(): boolean {
		return this.cookieService.check(this.apiService.cookieName)
	}

	logout(): Observable<any> {
		return this.http.post(`${this.apiService.baseApiUrl}/auth/logout`, {}, {
			headers: this.apiService.getAuthorizationHeader()
		})
	}

	getUserAuthenticated(): Observable<User> {
		return this.http.get<User>(`${this.apiService.baseApiUrl}/auth/user`, {
			headers: this.apiService.getAuthorizationHeader()
		})
	}
}
