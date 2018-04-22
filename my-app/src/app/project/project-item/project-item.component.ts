import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener
} from "@angular/core";
import { cardAnim } from "../../anims/card.anim";

@Component({
  selector: "app-project-item",
  templateUrl: "./project-item.component.html",
  styleUrls: ["./project-item.component.scss"],
  animations: [cardAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDel = new EventEmitter<void>();

  @HostBinding("@card") cardState = "out";

  constructor() {}

  ngOnInit() {}

  @HostListener("mouseenter", ["$event.target"])
  onMouseEnter(target) {
    this.cardState = "hover";
    //console.log(target);
  }

  @HostListener("mouseleave", ["$event.target"])
  onMouseLeave(target) {
    this.cardState = "out";
    //console.log(target);
  }

  onInviteClick() {
    //将该事件发射出去；
    this.onInvite.emit();
  }

  onEditClick() {
    this.onEdit.emit();
  }

  onDelClick() {
    this.onDel.emit();
  }
}
