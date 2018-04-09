import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, HttpModule],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports: [HeaderComponent, FooterComponent, SidebarComponent]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: CoreModule
  ) {
    if (parent) {
      throw new Error("模块已经存在，不能再次加载!");
    }
  }
}
