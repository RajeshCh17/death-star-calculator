import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPeopleComponent } from './search-people.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SearchPeopleComponent,
  },
];

@NgModule({
  declarations: [SearchPeopleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SearchPeopleComponent],
})
export class SearchPeopleModule {}
