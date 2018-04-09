import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>(); //不希望返回参数

  constructor() {}

  ngOnInit() {}

  openSidebar() {
    this.toggle.emit();
  }
}
