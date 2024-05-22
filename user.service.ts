import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Usermodel } from 'src/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient){}

  Postuser(data:any){
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(
      map(
        (res =>{
          return res;
        })
      )
    )
  }

  getuser(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(
      map(
        (res =>{
          return res;
        })
      )
    )
  }
  putuser(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/" + id, data).pipe(
      map(
        (res => {
          return res;
        })
      )
    )
  }
  deleteUser(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(
      map(
        (res =>{
          return res;
        })
      )
    )
  }
}



