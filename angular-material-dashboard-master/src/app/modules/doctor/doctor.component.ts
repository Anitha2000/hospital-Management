import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  constructor(public auth:AuthService, public route:Router) { }
  searchText:any;
  editDoctor:any=[{

  }]
  allDoctor:any;
  ngOnInit() {
    this.getAllDoctor()
  }
 
  getAllDoctor(){
    this.auth.getDoctorUser().subscribe((res:any)=>{
      this.allDoctor=res
      //console.log(res)
      //console.log(this.allDoctor)
    })
  }

  EditUser(doctorEdit){
    //console.log(doctorEdit)
    // console.log("Add Edit");
    // this.editDoctor=doctorEdit
    this.auth.setKey("doctorEditdata",doctorEdit)
    this.auth.setKey("edit",true)
    this.route.navigate(["/default/adddoctor"]);  
  }
  addDoctor(){
    //console.log("Add Doctor");
    this.auth.setKey("edit",false)
    this.route.navigate(["/default/adddoctor"]);
  }

  Removedata(id){
    //console.log(id)
    const userId = {
      id : id
    }
    console.log(userId)
    this.auth.deleteDoctor(userId).subscribe((res:any)=>{
      //console.log(res)
      if(res.message == "Deleted"){
        this.getAllDoctor()
      }
    })
  }

}
