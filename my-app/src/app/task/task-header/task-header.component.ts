import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-task-header",
  templateUrl: "./task-header.component.html",
  styleUrls: ["./task-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {
  @Input() header = "";

  @Output() newTask = new EventEmitter<void>();

  @Output() moveAll = new EventEmitter<void>();

  @Output() delList = new EventEmitter<void>();

  @Output() editList = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onNewTaskClick() {
    this.newTask.emit();
  }
  onMoveAllClick() {
    this.moveAll.emit();
  }
  onDelListClick() {
    this.delList.emit();
  }
  onEditListClick() {
    this.editList.emit();
  }
}
