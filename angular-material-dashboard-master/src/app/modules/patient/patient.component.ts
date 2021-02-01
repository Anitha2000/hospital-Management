import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  constructor(public auth:AuthService, public route:Router) { }
  searchText:any;
  patientAll=[]

  ngOnInit() {
    this.getAllPatient()
  }

  getAllPatient(){
    this.auth.allPatient().subscribe((res:any)=>{
      this.patientAll=res
    })
  }

  EditUser(patientEdit){
    //console.log(patientEdit);
    this.auth.setKey("patientEditdata",patientEdit)
    this.auth.setKey("editPatient",true)
    this.route.navigate(["/default/addpatient"]);
  }
  Removedata(id){
    console.log(id)
    const userId = {
      id : id
    }
    //console.log(userId)
    this.auth.deletePatient(userId).subscribe((res:any)=>{
      //console.log(res)
      if(res.message == "Deleted"){
        this.getAllPatient()
      }
    })

  }
  addPatient(){
    //console.log("Add patient");
    this.auth.setKey("editPatient",false)
    this.route.navigate(["/default/addpatient"]);
  }

}
