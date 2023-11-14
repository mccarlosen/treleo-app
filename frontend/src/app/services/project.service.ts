import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

	readonly baseUrl: string = environment.apiUrl

  constructor(
		private http: HttpClient,
		private apiService: ApiService
	) { }

	getProjects(): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/projects`, {
			headers: this.apiService.getAuthorizationHeader()
		})
	}

	getProject(projectId: number): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/projects/${projectId}`, {
			headers: this.apiService.getAuthorizationHeader()
		})
	}

	storeProject(title: string, description: string): Observable<any> {
		return this.http.post<any>(`${this.baseUrl}/projects`, {
			title,
			description
		}, {
			headers: this.apiService.getAuthorizationHeader()
		})
	}
}
