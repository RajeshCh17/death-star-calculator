import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeopleComponent } from './search-people.component';
import { Person, Planet } from '../../types';
import { StarWarsApi } from '../../services/star-wars-api.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SearchPeopleComponent', () => {
  let component: SearchPeopleComponent;
  let fixture: ComponentFixture<SearchPeopleComponent>;
  let starWarsApiSpy: jasmine.SpyObj<StarWarsApi>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj(StarWarsApi, [
      'fetchPlanetDetails',
      'fetchPersonsList',
    ]);
    const RouterSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [SearchPeopleComponent],
      providers: [
        { provide: StarWarsApi, useValue: spy },
        { provide: Router, useValue: RouterSpy },
      ],
      imports: [FormsModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(SearchPeopleComponent);
    component = fixture.componentInstance;
    starWarsApiSpy = TestBed.inject(StarWarsApi) as jasmine.SpyObj<StarWarsApi>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate planet volumes for given enemy list', () => {
    starWarsApiSpy.fetchPlanetDetails.and.returnValue(
      of({ name: 'planet', diameter: '3' } as Planet)
    );
    component.selectedEnemyList = [
      { name: 'test1', homeworld: '' },
    ] as Person[];

    component.computeAreaOfPlanets();

    expect(component.computedVolume).toBe(14);
  });
});
