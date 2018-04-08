import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CoreModule } from "./core/core.module";
import { MdSidenavModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, MdSidenavModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
