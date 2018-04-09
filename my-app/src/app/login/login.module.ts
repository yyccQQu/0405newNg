import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { LoginRoutingModule } from "./login-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [SharedModule, LoginRoutingModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
