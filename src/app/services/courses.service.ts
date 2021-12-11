import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
let counter=1;

@Injectable()
export class CoursesService {

  id:number;
  constructor(private httpClient:HttpClient) {

    console.log("Creating CoursesService...");
    this.id=counter++;
   }



  saveCourse(course: Course) {
    const headers= new HttpHeaders().set("X-Auth","userId");
     this.httpClient.put<Course>(`/api/courses/${course.id}`,course,{headers}).subscribe(()=>console.log("Course was saves successsfully"))
  }


loadCourses():Observable<Course[]>
{
  const params=new HttpParams().set("page","1") .set("PageSize","10");
  
  return this.httpClient.get<Course[]>('/api/courses',{params})
}

}
