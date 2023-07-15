import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import(
        './common/components/previous-calculations/previous-calculations.module'
      ).then((m) => m.PreviousCalculationsModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./common/components/search-people/search-people.module').then(
        (m) => m.SearchPeopleModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
