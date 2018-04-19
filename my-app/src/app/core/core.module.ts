import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
//图标引用文件
import { MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

import { SidebarComponent } from "./sidebar/sidebar.component";
//因为sharedModule里面是即引入了模块，有导出了模块，所以只需在coremodule中引入即可。
import { SharedModule } from "../shared/shared.module";
import { loadSvgResources } from "../utils/svg.util";
//动画
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//移动端
import "hammerjs";

@NgModule({
  imports: [BrowserAnimationsModule, SharedModule, HttpModule],
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
