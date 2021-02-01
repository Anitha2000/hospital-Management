import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  Login: boolean = false;

  constructor(private auth:AuthService,private router:Router,private formBuilder: FormBuilder) { }
  //constructor(private router:Router,private formBuilder: FormBuilder) { }
  user:any={}
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    //this.startLogin();
  }


  // startLogin(){
   
  // }
  

  forgotPassword(){

  }

  signUp(){
    this.router.navigate(['/signup'])
  }
  signupData={}
  login(){
    console.log("ydyut")
    this.Login = true;
    this.user={
      userName:this.loginForm.value.username,
      password:this.loginForm.value.password
    }
    if(this.loginForm.invalid){
      return
    }
    else{
      console.log("if")
      this.auth.loginUser(this.user).subscribe((res:any)=>{
             localStorage.setItem('token', res.token)
             this.router.navigate(['/default/patient'])
             console.log( res.token,"if");
             console.log(res.isAdmin)
             this.auth.setKey("userData",res.user)
             this.signupData=res.user
            // console.log(res.user)
          });
    }
    // else{
    //   this.auth.loginUser(this.user).subscribe((res:any)=>{
    //     localStorage.setItem('token', res.token)
    //     this.router.navigate(['/navbar'])
    //   })
    // }
    
  }

}
