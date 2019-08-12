import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize, catchError, tap } from 'rxjs/operators';;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Xevents } from '../xevents';

@Injectable({
  providedIn: 'root'
})
export class XApiService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private xUrl = 'https://lrs.adlnet.gov';
  private optionsUrl = '/xapi/statements?limit=25&format=exact';
  private auth = 'Basic c21jYXNleToxMjMxMjM=';


  constructor(
    private http: HttpClient
  ) { }

  getAllEvents(authVal): Observable<Xevents[]> {
    this.loadingSubject.next(true);
    const url = this.xUrl + this.optionsUrl;
    return this.http.get<Xevents[]>(url,
      {headers: new HttpHeaders({
        Authorization: authVal,
        'X-Experience-API-Version': '1.0.3'
        })
      }
    ).pipe(
      map(response => {
        const events = [];
        response.statements.forEach(event => events.push({actor: event.actor, verb: event.verb, object: event.object}));
        this.optionsUrl = response.more;
        return events;
      }),
      finalize(() => this.loadingSubject.next(false)),
      catchError(error => {
        return Observable.throw(error);
      })
    );
  }

  // On logout, resets this so that API gets initial 25 statements again
  resetOptionsUrl() {
    this.optionsUrl = '/xapi/statements?limit=25&format=exact';
  }

}
