import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ProjectListComponent } from "./project-list/project-list.component";

const routes: Routes = [{ path: "project", component: ProjectListComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
