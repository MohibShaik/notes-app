import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpCallInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.showHideAutoLoader();
    const accessToken = sessionStorage.getItem('accessToken');
    console.log('Hi');
    const tokenizedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // return next.handle(tokenizedRequest);
    return next.handle(tokenizedRequest).pipe(
      map((event: HttpEvent<any>) => {
        console.log('bye');
        // this.loader.hideLoader();
        // setTimeout((x) => this.loader.hideLoader, 1000);
        return event;
      })
    );
  }
}
