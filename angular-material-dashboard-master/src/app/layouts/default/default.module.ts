import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { DoctorComponent } from 'src/app/modules/doctor/doctor.component';
import { PatientComponent } from 'src/app/modules/patient/patient.component';
import { AddDoctorComponent } from 'src/app/add-doctor/add-doctor.component';
import { AddPatientComponent } from 'src/app/add-patient/add-patient.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    DoctorComponent,
    PatientComponent,
    AddDoctorComponent,
    AddPatientComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
