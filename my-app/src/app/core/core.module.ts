import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
//图标引用文件
import { MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { AppRoutingModule } from "../app-routing.module"; //将根路由引入
import { MdSidenavModule, MdTooltipModule } from "@angular/material";

//因为sharedModule里面是即引入了模块，有导出了模块，所以只需在coremodule中引入即可。
import { SharedModule } from "../shared/shared.module";
import { loadSvgResources } from "../utils/svg.util";
//动画
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//移动端
import "hammerjs";
//import "../utils/debug.util";
import "rxjs/add/observable/from";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/range";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/defaultIfEmpty";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/reduce";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/take";
import "rxjs/add/operator/count";
import "rxjs/add/operator/do";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    HttpModule,
    AppRoutingModule,
    MdSidenavModule,
    MdTooltipModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule
  ],
  providers: [
    {
      provide: "BASE_CONFIG",
      useValue: {
        uri: "http://localhost:3000"
      }
    }
  ]
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
