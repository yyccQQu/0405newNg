import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

import { SharedModule } from "./shared/shared.module";
import { LoginRoutingModule } from "./login/login-routing.module";

const routes: Routes = [
  {
    path: "login",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "",
    redirectTo: "/project",
    pathMatch: "full"
  }
];

@NgModule({
  //模块里面引入模块，大路由里面引入小路由
  imports: [SharedModule, LoginRoutingModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
