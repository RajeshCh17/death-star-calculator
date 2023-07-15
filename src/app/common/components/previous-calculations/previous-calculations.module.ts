import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviousCalculationsComponent } from './previous-calculations.component';
import { MatTableModule } from '@angular/material/table';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PreviousCalculationsComponent,
  },
];

@NgModule({
  declarations: [PreviousCalculationsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatTableModule],
  exports: [PreviousCalculationsComponent],
})
export class PreviousCalculationsModule {}
