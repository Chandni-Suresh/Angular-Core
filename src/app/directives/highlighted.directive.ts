import { Directive, EventEmitter, Host, HostBinding, HostListener, Input, Output } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Directive({
  selector: '[highlighted]',
  exportAs: 'hld'
})
export class HighlightedDirective {

  @Input('highlighted')
  //default value is false
  isHighlighted=false;

  @Output()
  toggleHighlight= new EventEmitter();

  constructor(@Host()private coursesSerice:CoursesService ) {
    console.log("Highlighted Directive is created ...")

   }
   @HostListener('mouseover',['$event'])
   mouseover($event)
   {
     console.log($event);
     this.isHighlighted=true;
     this.toggleHighlight.emit(this.isHighlighted);
   }

   @HostListener('mouseleave')
   mouseleave()
   {
     this.isHighlighted=false;
     this.toggleHighlight.emit(this.isHighlighted);
   }

 /*   @HostBinding('style.border')
   get cssClasses(){
     return "1px solid red";
   } */
 
   @HostBinding("class.highlighted")
   get cssClass()
   {
     return this.isHighlighted;
   }

   //Adding Attributes like diabled required
   @HostBinding('attr.disabled')
   get attribute()
   {
     return true;
   }
   

   toggleApi()
   {
     this.isHighlighted=!this.isHighlighted;
     this.toggleHighlight.emit(this.isHighlighted);
   }

}
