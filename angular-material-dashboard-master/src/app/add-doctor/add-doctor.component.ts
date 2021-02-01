import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  doctorForm: FormGroup;
  docSubmit: any = false;
  doctor: { userName: any; password: any; passwordConfirm: any; name: any; email: any; phoneNumber: any; isAdmin: boolean; };
  edit: any = false;
  editData: { name: any; email: any; phoneNumber: any; id: any };
  constructor(private auth: AuthService, private formBuilder: FormBuilder, public route: Router) { }

  ngOnInit() {
    this.docSubmit = false;
    this.doctorForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      // password: [null, [Validators.required]],
      // cnfrmPassword: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobileNumber: [null, [Validators.required]]

    });
    this.auth.getKey("doctorEditdata")
    this.edit = this.auth.getKey("edit")
    console.log(this.edit)
    if (this.edit == true) {
      console.log(this.auth.getKey("doctorEditdata"))
      const doctorEditdata = this.auth.getKey("doctorEditdata")
      this.doctorForm.patchValue({
        username: doctorEditdata.userName,
        name: doctorEditdata.name,
        mobileNumber: doctorEditdata.phoneNumber,
        email: doctorEditdata.email
      })
    }
  }

  doctorSubmit() {
    this.docSubmit = true;
    if (this.doctorForm.invalid) {
      console.log(this.doctorForm)
      return
    } else {

      if (this.edit == true) {
        const doctorEditdata = this.auth.getKey("doctorEditdata")
        this.editData = {
          id: doctorEditdata._id,
          name: this.doctorForm.value.name,
          email: this.doctorForm.value.email,
          phoneNumber: this.doctorForm.value.mobileNumber,
        }
        this.auth.editDoctor(this.editData).subscribe((res: any) => {
          //console.log(res)
          //localStorage.setItem('token',res.token)
          this.route.navigate(['/default/doctor'])
          //this.startSignUp()
          //console.log("ydyut")
        });
      }
      else {
        this.doctor = {
          userName: this.doctorForm.value.username,
          password: "123456",
          passwordConfirm: "123456",
          name: this.doctorForm.value.name,
          email: this.doctorForm.value.email,
          phoneNumber: this.doctorForm.value.mobileNumber,
          isAdmin: false,
        }
        this.auth.signUpUser(this.doctor).subscribe((res: any) => {
          //console.log(res)
          //localStorage.setItem('token',res.token)
          this.route.navigate(['/default/doctor'])
          //this.startSignUp()
          //console.log("ydyut")
        });
      }
    }
  }

}
