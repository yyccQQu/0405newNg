import { NgModule } from "@angular/core";
import { TaskHomeComponent } from "./task-home/task-home.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskItemComponent } from "./task-item/task-item.component";
import { SharedModule } from "../shared/shared.module";
import { TaskHeaderComponent } from "./task-header/task-header.component";
import { TaskRoutingModule } from "./task-routing.module";
import { NewTaskComponent } from "./new-task/new-task.component";
import { CopyTaskComponent } from "./copy-task/copy-task.component";
import { NewTaskListComponent } from "./new-task-list/new-task-list.component";
import { QuickTaskComponent } from './quick-task/quick-task.component';

@NgModule({
  imports: [SharedModule, TaskRoutingModule],
  declarations: [
    TaskHomeComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskHeaderComponent,
    NewTaskComponent,
    CopyTaskComponent,
    NewTaskListComponent,
    QuickTaskComponent
  ],
  entryComponents: [NewTaskComponent, CopyTaskComponent, NewTaskListComponent]//一进来就加载的组件
})
export class TaskModule {}
