import {AfterViewInit, Component, ElementRef, Inject, InjectionToken,  Optional,  QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChangeDetectionStrategy, ChangeDetectorRef,  DoCheck,  Injector, OnInit} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';
import {AppConfig, APP_CONFIG, CONFIG_TOKEN} from './config';
import {COURSES} from '../db-data';
import {createCustomElement} from '@angular/elements';
import {CourseTitleComponent} from './course-title/course-title.component';
import { HighlightedDirective } from './courses/directives/highlighted.directive';
import { CourseCardComponent } from './courses/course-card/course-card.component';


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
      {provide: CONFIG_TOKEN, useFactory:()=>APP_CONFIG},
      CoursesService
    ]
})
export class AppComponent implements OnInit,AfterViewInit {

  courses$:Observable<Course[]>
   
  @ViewChildren(CourseCardComponent ,{read: HighlightedDirective})
  highlightedDirective:HighlightedDirective;

    constructor(
        @Optional()private coursesService: CoursesService,@Inject(CONFIG_TOKEN) config:AppConfig    
        ) {

          console.log(config);
          this.courses$=this.coursesService.loadCourses();  
    }

  ngAfterViewInit() {
    console.log("Inside After View init",this.highlightedDirective);
  }

    ngOnInit() {

       // const htmlElement = createCustomElement(CourseTitleComponent, {injector:this.injector});

        //customElements.define('course-title', htmlElement);
    }
 
      

    onEditCourse() {

            this.courses$[1].category = 'ADVANCED';

    }

    save(course: Course) {
        this.coursesService.saveCourse(course)
            
    }

    OnToggleEvenetHandler($event){
      console.log("Toggle is ", $event);
    }
  }

