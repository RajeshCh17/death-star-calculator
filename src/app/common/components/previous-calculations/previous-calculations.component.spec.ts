import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousCalculationsComponent } from './previous-calculations.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';

describe('PreviousCalculationsComponent', () => {
  let component: PreviousCalculationsComponent;
  let fixture: ComponentFixture<PreviousCalculationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousCalculationsComponent],
      imports: [RouterTestingModule, MatTableModule],
    });
    fixture = TestBed.createComponent(PreviousCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
