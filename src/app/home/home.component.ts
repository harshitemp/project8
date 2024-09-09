import { HttpClient } from '@angular/common/http';
import { Component, inject,OnInit } from '@angular/core';
import{FormsModule} from '@angular/forms'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
department:any[]=[]
DeptObj:any={
"departmentName":"",
"departmentLogo":" "
}

http=inject(HttpClient);

ngOnInit():void{
  this.getData()
}
getData(){
  this.http.get("https://projectapi.gerasim.in/api/Complaint/GetParentDepartment")
  .subscribe((result:any)=>{
  this.department=result.data
  })
}
onsubmit(){
  console.log(this.DeptObj)
  this.http.post("https://projectapi.gerasim.in/api/Complaint/AddNewDepartment",this.DeptObj).subscribe((result:any)=>{
if(result.result){
  alert("your record created!")
  this.getData()
}
else{
  alert(result.error);
}
  })

}
onedit(){
  this.http.post("https://projectapi.gerasim.in/api/Complaint/UpdateDepartment",this.DeptObj).subscribe((result:any)=>{
    if(result.result){
      alert("your data updated !")
      this.getData()
    }
    else{
      alert(result.error);
    }
  })
}
ondelete(id:any){
  const isDelete=confirm("you want to delete")
  if(isDelete){
  this.http.delete("https://projectapi.gerasim.in/api/Complaint/DeletedepartmentBydepartmentId?departmentId"+id).subscribe((result:any)=>{
    if(result.result){
      alert("your record deleted !")
      this.getData()
    }
    else{
      alert(result.error);
    }
  })
}
}

}
