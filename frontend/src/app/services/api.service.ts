import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	readonly baseApiUrl: string = environment.apiUrl
	readonly cookieName: string = environment.cookieName
  constructor(private http: HttpClient, private cookieService: CookieService) {}
	getAuthorizationHeader(): HttpHeaders {
		const headers = new HttpHeaders({'Authorization': `Bearer ${this.cookieService.get(environment.cookieName)}`})
		return headers
	}
}
