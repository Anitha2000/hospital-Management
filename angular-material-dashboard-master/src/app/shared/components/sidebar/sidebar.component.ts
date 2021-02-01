import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isAdmin: any = false;
  name: any;
  email: any;

  constructor(public route:Router,public auth:AuthService) { }

  ngOnInit() {
    if(this.auth.getKey("userData") !== undefined){
       const userData= this.auth.getKey("userData")
       this.isAdmin = userData.isAdmin
       this.name = userData.name
       this.email = userData.email
    }
  }

}
