import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  patientForm: FormGroup;
  patientSub: any = false
  patient: {
    name: any;
    email: any;
    mobileNumber: any;
    age: any;
    gender: any;
    city: any;
  };

  edit: any = false;
  editData: {
    name: any;
    email: any;
    mobileNumber: any;
    age: any;
    gender: any;
    city: any;
    id:any
  };
  constructor(private auth: AuthService, private route: Router, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.patientSub = false;
    this.patientForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobileNumber: [null, [Validators.required]],
      age: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
    this.auth.getKey("patientEditdata")
    this.edit = this.auth.getKey("editPatient")
    console.log(this.edit)
    if (this.edit == true) {
      console.log(this.auth.getKey("patientEditdata"))
      const patientEditdata = this.auth.getKey("patientEditdata")
      this.patientForm.patchValue({
        name: patientEditdata.name,
        email: patientEditdata.email,
        mobileNumber: patientEditdata.mobileNumber,
        age: patientEditdata.age,
        gender: patientEditdata.gender,
        city: patientEditdata.city,
      })
    }
  }
  patientSubmit() {
    this.patientSub = true;
    if (this.patientForm.invalid) {
      console.log("invalid")
      console.log(this.patientForm);
      return;
    }
    else{
      if (this.edit == true) {
        console.log("else if")
        const patientEditdata = this.auth.getKey("patientEditdata")
        console.log(patientEditdata)
        this.editData = {
          id: patientEditdata._id,
          name: this.patientForm.value.name,
          email: this.patientForm.value.email,
          mobileNumber: this.patientForm.value.mobileNumber,
          age: this.patientForm.value.age,
          gender: this.patientForm.value.gender,
          city: this.patientForm.value.city,
        }
        this.auth.editPatient(this.editData).subscribe((res: any) => {
          console.log(res)
          //localStorage.setItem('token',res.token)
          this.route.navigate(['/default/patient'])
          //this.startSignUp()
          //console.log("ydyut")
        });
      }
      else {
        console.log("else")
        this.patient = {
          name: this.patientForm.value.name,
          email: this.patientForm.value.email,
          mobileNumber: this.patientForm.value.mobileNumber,
          age: this.patientForm.value.age,
          gender: this.patientForm.value.gender,
          city: this.patientForm.value.city,
        }
        console.log(this.patient)
        this.auth.addPatient(this.patient).subscribe((res: any) => {
          //console.log(res)
          //console.log("else")
          //localStorage.setItem('token',res.token)
          this.route.navigate(['/default/patient'])
          //this.startSignUp()
          //console.log("ydyut")
        });
      }

    }
  }
}
