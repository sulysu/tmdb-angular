import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import {environment} from '../../../environments/environment'
const apiUrl = environment.apiUrl;
const SEARCH_URL = apiUrl+'search';
const PARAMS = new HttpParams();

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<any[]>(SEARCH_URL, { params: PARAMS.set('keywords', term) }).pipe(
        map(response => response.slice(0,7))
      );
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [SearchService],
  styleUrls: ['./search.component.css']
})


export class SearchComponent {
  model: any;
  searching = false;
  searchFailed = false;

  constructor(private _service: SearchService) { }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  formatter = (x: { id:number,name: string, backdrop_path : string, media_type : string}) => "";
}
