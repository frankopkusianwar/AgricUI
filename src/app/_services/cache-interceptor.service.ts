import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from "@angular/common/http";

// Add RxJS observable
import { Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';

// Add cache registration service
import { HttpCacheService } from './http-cache.service';

@Injectable()
export class CacheIntercepror implements HttpInterceptor {
	private cachedData = new Map<string, any>();

	constructor(private cacheService: HttpCacheService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if(req.method !== 'GET') {
			this.cacheService.invalidateCache();
			return next.handle(req);
		}

		const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

		if(cachedResponse) {
			return of(cachedResponse);
		}

		return next.handle(req)
			.pipe(
				tap(event =>{
					if(event instanceof HttpResponse){
						this.cacheService.put(req.url, event);
					}
				})
			);
		
	}
}
