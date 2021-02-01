import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DoctorComponent } from './modules/doctor/doctor.component';
import { PatientComponent } from './modules/patient/patient.component';
import { LoginComponent } from './page/login/login.component';

import { SignupComponent } from './page/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  {
    path: 'default', component: DefaultComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'doctor', component: DoctorComponent },
      {path:'adddoctor',component:AddDoctorComponent},
      {path:'patient', component:PatientComponent},
      {path:'addpatient',component:AddPatientComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
