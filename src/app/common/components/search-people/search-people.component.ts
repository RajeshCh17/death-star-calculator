import { Component } from '@angular/core';
import { from, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  concatMap,
  reduce,
  filter,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { StarWarsApi } from '../../services/star-wars-api.service';
import { Person } from '../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'dsc-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss'],
})
export class SearchPeopleComponent {
  list: Person[] = [];
  selectedEnemyList: Person[] = [];
  query = '';
  homeWorldsList = new Set<string>();
  computedVolume = 0;

  constructor(private api: StarWarsApi, private router: Router) {}

  fetchQueryResult() {
    const formattedQuery = this.query.trim().toLocaleLowerCase();
    of(formattedQuery)
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        filter((query) => query.length >= 2),
        switchMap(() => this.api.fetchPersonsList(formattedQuery)),
        catchError((err) => of([{ name: '', homeworld: '' }] as Person[]))
      )
      .subscribe((response) => {
        this.list = response;
      });
  }

  addToEnemyList(person: Person) {
    //filter people list & update selected list.
    this.list = this.list.filter((item) => {
      if (item.name == person.name) {
        this.selectedEnemyList.push(item);
        return false;
      }
      return true;
    });
  }

  computeAreaOfPlanets() {
    //pick only unique elements.
    this.homeWorldsList = new Set(
      this.selectedEnemyList.map((item) => item.homeworld)
    );

    from([...this.homeWorldsList])
      .pipe(
        map((enemy) => this.getIdFromHomeWorld(enemy)),
        concatMap((id) => this.api.fetchPlanetDetails(id)),
        map((res) => res.diameter),
        reduce((acc, val) => acc + this.calculatePlanetVolume(val), 0),
        catchError((err) => of(0))
      )
      .subscribe((val: number) => {
        this.computedVolume = val;
      });
  }

  getIdFromHomeWorld(homeworld: string) {
    const arr = homeworld.split('/');
    return arr[arr.length - 2];
  }

  calculatePlanetVolume(diameter: string): number {
    const radius = parseInt(diameter) / 2;
    if (!radius) return 0;
    return Math.trunc((4 / 3) * Math.PI * Math.pow(radius, 3));
  }

  acceptCalculations() {
    const key = this.formatKey();
    sessionStorage.setItem(key, JSON.stringify(this.computedVolume));
    this.router.navigateByUrl('/home');
  }

  formatKey() {
    return JSON.stringify(this.selectedEnemyList.map((item) => item.name))
      .replace(/[[\]]/g, '')
      .replace(/,/g, '/');
  }
}
