import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface VolumeDataInterface {
  persons: string;
  volume: number | string;
}

@Component({
  selector: 'dsc-previous-calculations',
  templateUrl: './previous-calculations.component.html',
  styleUrls: ['./previous-calculations.component.scss'],
})
export class PreviousCalculationsComponent implements OnInit {
  displayedColumns: string[] = ['persons', 'volume'];
  dataSource = new MatTableDataSource<VolumeDataInterface>();

  ngOnInit(): void {
    this.updateDataSource();
  }

  updateDataSource() {
    for (const [key, value] of Object.entries(sessionStorage)) {
      this.dataSource.data.push({ persons: key, volume: value });
    }
  }
}
