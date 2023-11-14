import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const SessionGuard: CanActivateFn = (route, state) => {
	
	const cookieService: CookieService = inject(CookieService)
	const router: Router = inject(Router)

	if (cookieService.check('treleo_auth')) {
		return true;
	}
	router.navigate(['/login'])
	return false;
};
