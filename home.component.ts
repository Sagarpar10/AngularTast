import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  Usermodel } from 'src/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  UserForm!: FormGroup;

  userobj : Usermodel = new Usermodel;

  userList: any=[];

  profileImageUrl: string | ArrayBuffer | null = '';
firstname: any;
f: any;

  constructor(private formBuilder:FormBuilder, private userervice:UserService){}

  ngOnInit(): void {
      this.UserForm = this.formBuilder.group({
        firstname : [''],
        lastname : [''],
        email: [''],
        age: [''],
        contact: [''],
        country: [''],
        state: [''],
        address: [''],
        hobby: [''],
        profile: [''],
      })
      this.getUser();
  }
  Adduser(){
    this.userobj.firstname = this.UserForm.value.firstname;
    this.userobj.lastname = this.UserForm.value.lastname;
    this.userobj.email = this.UserForm.value.email;
    this.userobj.email = this.UserForm.value.email;
    this.userobj.age = this.UserForm.value.age;
    this.userobj.contact = this.UserForm.value.contact;
    this.userobj.country = this.UserForm.value.country;
    this.userobj.state = this.UserForm.value.state;
    this.userobj.address = this.UserForm.value.address;
    this.userobj.hobby = this.UserForm.value.hobby;
    //profile: this.profileImageUrl as string,
    this.userobj.profile = this.UserForm.value.profile;

    this.userervice.Postuser(this.userobj).subscribe({next: (v)=>{
      console.log(v)
    },
  error: (e) =>{
    console.log(e);
    alert("Error");
  },
  complete: () =>{
    console.log("user added")
    alert("user added")
    this.getUser();
    this.UserForm.reset();
  }})
}
  getUser(){
    this.userervice.getuser().subscribe(res =>{
      this.userList =res;
    })
  }

  deleteUser(data:any){
    this.userervice.deleteUser(data.id).subscribe({next: (v)=>{
      console.log(v)
    },
  error: (e) =>{
    console.log(e);
    alert("Error");
  },
  complete: () =>{
    console.log("user deleted")
    alert("user deleted")
    this.getUser();
  }})

  }

  editUser(data:any){
    this.UserForm.controls["firstname"].setValue(data.firstname);
    this.UserForm.controls["lastname"].setValue(data.lastname);
    this.UserForm.controls["email"].setValue(data.email);
    this.UserForm.controls["age"].setValue(data.age);
    this.UserForm.controls["contact"].setValue(data.contact);
    this.UserForm.controls["country"].setValue(data.country);
    this.UserForm.controls["state"].setValue(data.state);
    this.UserForm.controls["address"].setValue(data.address);
    this.UserForm.controls["hobby"].setValue(data.hobby);
    this.UserForm.controls["profile"].setValue(data.profile);
    this.userobj.id = data.id;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}