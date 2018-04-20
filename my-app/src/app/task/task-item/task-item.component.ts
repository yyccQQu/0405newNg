import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { itemAnim } from "../../anims/item.anim";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
  animations: [itemAnim]
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;

  @Output() taskClick = new EventEmitter<void>();

  widerPriority: string = "in";

  constructor() {}

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : "unassigned";
  }

  onItemClick() {
    this.taskClick.emit();
  }
  onCheckBoxClick(ev: Event) {
    ev.stopPropagation();
  }

  @HostListener("mouseenter", ["$event.target"])
  onMouseEnter(target) {
    this.widerPriority = "out";
    //console.log(target);
  }

  @HostListener("mouseleave", ["$event.target"])
  onMouseLeave(target) {
    this.widerPriority = "in";
    //console.log(target);
  }
}
