import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('authtoken');
  if (authToken) {
    const cloned = req.clone({
      headers: req.headers.set('x-api-key', "Bearer "+authToken)
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
