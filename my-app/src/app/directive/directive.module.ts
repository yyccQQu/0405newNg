import { NgModule } from "@angular/core";
import { DragDirective } from "./drag-drop/drag.directive";
import { DropDirective } from "./drag-drop/drop.directive";

@NgModule({
  declarations: [DragDirective, DropDirective],
  exports: [DragDirective, DropDirective]
})
export class DirectiveModule {}
