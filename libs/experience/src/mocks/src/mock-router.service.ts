import { RouteParams, RouterService } from '@spryker-oryx/experience';
import { Observable, ReplaySubject } from 'rxjs';

export class MockRouterService implements Partial<RouterService> {
  private params$ = new ReplaySubject<RouteParams>(1);

  go(): void {
    //mock
  }
  back(): void {
    //mock
  }
  navigate(): void {
    //mock
  }

  currentParams(): Observable<RouteParams> {
    return this.params$;
  }

  acceptParams(params: RouteParams): void {
    this.params$.next(params);
  }
}