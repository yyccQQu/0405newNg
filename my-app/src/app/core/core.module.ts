import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
//图标引用文件
import { MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { SharedModule } from "../shared/shared.module";
import { loadSvgResources } from "../utils/svg.util";

@NgModule({
  imports: [CommonModule, SharedModule, HttpModule],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports: [HeaderComponent, FooterComponent, SidebarComponent]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parent: CoreModule,
    ir: MdIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error("模块已经存在，不能再次加载!");
    }
    //调用应用svg的module类
    loadSvgResources(ir, ds);
  }
}
