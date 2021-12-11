import { Directive, Input, TemplateRef, ViewChildren, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxUnless]'
})
export class NgxUnlessDirective {

  // templateRef to get the <ng-template>
  //VIewConatiner service to create an embedded view using the template ref
  constructor(private templateRef:TemplateRef<any>, private viewContainer :ViewContainerRef) {   
   }


   //Flag to check if view is already present or no

   visible=false;
   @Input()
   set ngxUnless(condition:boolean)
   {
     if(!condition && !this.visible)
     {
       //Create the template ref
       this.viewContainer.createEmbeddedView(this.templateRef);
       this.visible=true;
     }
     else if(condition && this.visible)
     {
       //Clear the template nothing to display
       this.viewContainer.clear();
       this.visible=false;
     }

    }
   
}
