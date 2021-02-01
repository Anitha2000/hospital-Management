import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private router:Router, private http:HttpClient) { }
  private url = "http://localhost:3000/api/"
  apiConstants = {
    login : "login",
    signup : "signup",
    addDoctor : "addDoctor",
    patient:"patient",
    addpatient : "addpatient",
    user: "user",
    editDoctor:"editDoctor",
    deleteDoctor : "deleteDoctor",
    editPatient:"editPatient",
    deletePatient:"deletePatient"
  }
  /* private _loginUrl = "http://localhost:3000/api/login"
  private _signUpUrl = "http://localhost:3000/api/signup"
  private _adminDoctor = "http://localhost:3000/api/admindoctor"
  private _allPatient = "http://localhost:3000/api/doctor" */
  signUpUser(user:any) {

    return this.http.post(this.url+ this.apiConstants.signup, user)
  }

  loginUser(user:any) {

    return this.http.post(this.url+ this.apiConstants.login, user)
  }
 
  loggedIn() {
    let booleanVal = !!localStorage.getItem('token')
    return booleanVal
  }
  logOutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['login'])

  }

  getDoctorUser(){
    return this.http.get(this.url+ this.apiConstants.user)
  }
  allPatient(){
    return this.http.get(this.url+ this.apiConstants.patient)
  }

  addPatient(options){
    return this.http.post(this.url+ this.apiConstants.addpatient,options)
  }

  editDoctor(options){
    return this.http.put(this.url+ this.apiConstants.editDoctor,options)
  }

  editPatient(options){
    return this.http.put(this.url+ this.apiConstants.editPatient,options)
  }

  deleteDoctor(id){
    console.log(id)
    return this.http.delete(this.url+ this.apiConstants.deleteDoctor,id)
  }

  deletePatient(id){
    console.log(id)
    return this.http.delete(this.url+ this.apiConstants.deletePatient,id)
  }

  private encrypt(data: any, key: any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    } catch (e) {
      console.log(e);
    }
  }

  private decrypt(data: any, key: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, key);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  //localstorage
  setKey(key: string, data: any): void {
    data = this.encrypt(data, key).toString();
    localStorage.setItem(key, data);
  }

  getKey(key: any): any {
    if (localStorage.getItem(key)) {
      return this.decrypt(localStorage.getItem(key), key);
    }
  }
}
