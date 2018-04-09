import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MdIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>(); //不希望返回参数

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "gifts",
      sanitizer.bypassSecurityTrustResourceUrl("assets/add.svg")
    );
  }

  ngOnInit() {}

  openSidebar() {
    this.toggle.emit();
  }
}
