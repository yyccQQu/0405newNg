import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [{ path: "login", component: LoginComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
