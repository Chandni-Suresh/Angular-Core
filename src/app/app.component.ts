import {AfterViewInit, Component, ElementRef, Inject, InjectionToken, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';

//factory method that created the dependency class
//ALternately instead of useFactory we can use useClass in provider
/* function coursesServiceProvider(httpClient:HttpClient):CoursesService{
  return new CoursesService(httpClient);
}
 */
//Unique name of the dependency
//alternately it can use the class name then we dont need this line
// export const COURSES_SERVICE= new InjectionToken<CoursesService>('COURSES_SERVICE');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    CoursesService,
    ]
})
export class AppComponent implements OnInit {


  courses$:Observable<Course[]>

  constructor( private coursesService:CoursesService) {
    console.log("App Component creating CoursesService instance" , this.coursesService.id);
  }

  ngOnInit() {
    //Initialisation used for backend service

   this.courses$=this.coursesService.loadCourses();
    
    
  }

  save(course:Course){
    this.coursesService.saveCourse(course);
  }
}



