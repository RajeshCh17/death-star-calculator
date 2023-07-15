import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Person, Planet, SearchPersonresponse } from '../types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StarWarsApi {
  constructor(private http: HttpClient) {}

  fetchPersonsList(query: string = ''): Observable<Person[]> {
    let URL = `${environment.apiUrlPeople}`;
    if (query) URL = `${URL}?search=${query}`;
    return this.http
      .get<SearchPersonresponse>(URL)
      .pipe(map((res) => res.results));
  }

  fetchPlanetDetails(planetId: string): Observable<Planet> {
    const URL = `${environment.apiUrlPlanet}${planetId}`;
    return this.http.get<Planet>(URL);
  }
}
