import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { SessionGuard } from './session.guard';
import { PanelComponent } from './panel/panel.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/projects',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		title: 'Login',
	},
	{
		path: 'projects',
		component: PanelComponent,
		title: 'Proyectos',
		canActivate: [SessionGuard],
		children: [
			{
				path: '',
				component: ProjectComponent,
				canActivateChild: [SessionGuard]
			},
			{
				path: 'create',
				title: 'Crear Proyeto',
				component: CreateProjectComponent,
				canActivateChild: [SessionGuard]
			},
			{
				path: 'view/:project_id',
				title: 'Detalle del Proyeto',
				component: ViewProjectComponent,
				canActivateChild: [SessionGuard]
			},
		]
	}
];
