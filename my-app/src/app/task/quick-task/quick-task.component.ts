import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-quick-task",
  templateUrl: "./quick-task.component.html",
  styleUrls: ["./quick-task.component.scss"]
})
export class QuickTaskComponent implements OnInit {
  desc: string;

  @Output() quickTask = new EventEmitter<string>(); //后面的泛型为要发射出去的数据类型
  constructor() {}

  ngOnInit() {}

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value), JSON.stringify(valid));
  }

  @HostListener("keyup.enter")
  sendQuickTask() {
    if (!this.desc || this.desc.length === 0 || !this.desc.trim()) {
      return;
    }

    this.quickTask.emit(this.desc);
    this.desc = "";
  }
}
