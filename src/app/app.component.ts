import {AfterViewInit, Component, ElementRef, Inject, InjectionToken,  QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChangeDetectionStrategy, ChangeDetectorRef,  DoCheck,  Injector, OnInit} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';
import {AppConfig, CONFIG_TOKEN} from './config';
import {COURSES} from '../db-data';
import {createCustomElement} from '@angular/elements';
import {CourseTitleComponent} from './course-title/course-title.component';


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
})
export class AppComponent implements OnInit {

  courses$:Observable<Course[]>
   

    constructor(
        private coursesService: CoursesService,
        @Inject(CONFIG_TOKEN) private config: AppConfig,
        private injector: Injector) {

          this.courses$=this.coursesService.loadCourses();  
    }

    ngOnInit() {

        const htmlElement = createCustomElement(CourseTitleComponent, {injector:this.injector});

        customElements.define('course-title', htmlElement);
    }
 
      

    onEditCourse() {

            this.courses$[1].category = 'ADVANCED';

    }

    save(course: Course) {
        this.coursesService.saveCourse(course)
            
    }


  }

