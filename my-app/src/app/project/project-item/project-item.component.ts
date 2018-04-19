import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-project-item",
  templateUrl: "./project-item.component.html",
  styleUrls: ["./project-item.component.scss"]
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onInviteClick() {
    //将该事件发射出去；
    this.onInvite.emit();
  }

  onEditClick() {
    this.onEdit.emit();
  }
}
