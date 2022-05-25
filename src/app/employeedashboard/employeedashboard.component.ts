import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApiService } from '../shared1/api.service';
import { EmloyeeModel } from '../shared1/employee-dash board.model';
@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {

  formvalue !:FormGroup;
  employmodelobj : EmloyeeModel=new EmloyeeModel();
  employeedata !: any;
  showadd!:boolean;
  showupdate!:boolean;
  searchText:any;

  constructor(private formbuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : [''],
      salary : [''],


    })
    
    this.getallemployee();
  }
  clickaddemp(){
    this.formvalue.reset();
    this.showadd=true;
    this.showupdate=false;
  }

  postempdetails(){
    this.employmodelobj.firstname=this.formvalue.value.firstname;
    this.employmodelobj.lastname=this.formvalue.value.lastname;
    this.employmodelobj.email=this.formvalue.value.email;
    this.employmodelobj.mobile=this.formvalue.value.mobile;
    this.employmodelobj.salary=this.formvalue.value.salary;
    this.api.postemployee(this.employmodelobj)
    .subscribe(res=>{
      console.log(res);
      alert("added successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formvalue.reset();
      this.getallemployee();
    },
    err=>{
      alert("something went Wrong")
    })

  }
  getallemployee(){
    this.api.getemployee()
    .subscribe(res=>{
      this.employeedata=res;
    })
  }
  deleteemp(row : any){
    this.api.Deleteemployee(row.id)
    .subscribe(res=>{
      alert("Record Deleted");
      this.getallemployee();

    })
  }
  onedit(row:any){
    this.showadd=false;
    this.showupdate=true;

    this.employmodelobj.id=row.id;  
    this.formvalue.controls['firstname'].setValue(row.firstname);
    this.formvalue.controls['lastname'].setValue(row.lastname);
    this.formvalue.controls['email'].setValue(row.email);
    this.formvalue.controls['mobile'].setValue(row.mobile);
    this.formvalue.controls['salary'].setValue(row.salary);
  }
    updateempdetails(){
      this.employmodelobj.firstname=this.formvalue.value.firstname;
      this.employmodelobj.lastname=this.formvalue.value.lastname;
      this.employmodelobj.email=this.formvalue.value.email;
      this.employmodelobj.mobile=this.formvalue.value.mobile;
      this.employmodelobj.salary=this.formvalue.value.salary;
      this.api.Updateemployee(this.employmodelobj,this.employmodelobj.id)
      .subscribe(res=>{
        alert("Updated succesfuly!!");
        console.log(res);
        let ref=document.getElementById('cancel');
      ref?.click();
     // this.formvalue.reset();
      this.getallemployee();
      },
    err=>{
      alert("something went Wrong")
    }
      )
    }
   
    

    }

  




