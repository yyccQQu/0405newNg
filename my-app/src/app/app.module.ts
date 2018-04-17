import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoreModule } from "./core/core.module";
import { MdSidenavModule, MdTooltipModule } from "@angular/material";
import { AppRoutingModule } from "./app-routing.module"; //将根路由引入

import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { LoginComponent } from "./login/login/login.component";
import { RegisterComponent } from "./login/register/register.component";
import { ProjectModule } from "./project/project.module";
import { TaskModule } from "./task/task.module";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    TaskModule,
    MdSidenavModule,
    MdTooltipModule,
    SharedModule,
    ProjectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
