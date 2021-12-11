import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {CoursesModule} from './courses/courses.module';
import {CourseTitleComponent} from './course-title/course-title.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';

@NgModule({
    declarations: [
        AppComponent,
        CourseTitleComponent,
        HighlightedDirective,
        NgxUnlessDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoursesModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [CourseTitleComponent]
})
export class AppModule {

}
