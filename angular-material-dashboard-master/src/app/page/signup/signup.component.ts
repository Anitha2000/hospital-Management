import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  signup: boolean = false;
  user={}
  errorMessage: string;
  constructor(private auth:AuthService,public route:Router,private formBuilder: FormBuilder) { }
  //constructor(private route:Router,private formBuilder: FormBuilder) { }
  selectSpecialist:any
  data=['-selectSpecialist-','Cornea Specialist','General Ophthalmologist']
  
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      cnfrmPassword: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email:[null,[Validators.required]],
      mobileNumber: [null, [Validators.required]]

    });
    
    }

    // startSignUp(){
      
    // }
    login(){
      this.route.navigate(['/login'])
    }
    
    signUp(){
      this.signup = true;
      
      if(this.signupForm.invalid){
        //console.log(this.signupForm)
        return;
      }else{
        if(this.signupForm.value.password !== this.signupForm.value.cnfrmPassword){
          this.errorMessage = "Password Mismatch"
          setTimeout(() => {
            this.errorMessage = ""
          }, 2000);
          return;
        }
        else{
          this.user = {
            userName: this.signupForm.value.username,
            password: this.signupForm.value.password,
            passwordConfirm: this.signupForm.value.cnfrmPassword,
            name: this.signupForm.value.name,
            email: this.signupForm.value.email,
            phoneNumber: this.signupForm.value.mobileNumber,
            isAdmin:false,
          }
          this.auth.signUpUser(this.user).subscribe((res:any)=>{
            localStorage.setItem('token',res.token)
            this.route.navigate(['login'])
          });
        }
      }
    
    }
  
}
