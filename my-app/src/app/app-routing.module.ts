import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login/login-routing.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  }
];

@NgModule({
  //模块里面引入模块，大路由里面引入小路由
  imports: [CommonModule, LoginRoutingModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
