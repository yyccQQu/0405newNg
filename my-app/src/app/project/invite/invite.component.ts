import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { User } from "../../domain";
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";

@Component({
  selector: "app-invite",
  templateUrl: "./invite.component.html",
  styleUrls: ["./invite.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  members: User[] = [];
  dialogTitle: string;

  constructor(
    @Inject(MD_DIALOG_DATA) private data: any,
    private dialogRef: MdDialogRef<InviteComponent>
  ) {}

  ngOnInit() {
    this.members = [...this.data.members];
    this.dialogTitle = this.data.dialogTitle
      ? this.data.dialogTitle
      : "邀请成员";
  }

  onSubmit(ev: Event, { value, valid }) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }
}
