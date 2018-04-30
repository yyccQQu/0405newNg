import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from "@angular/core";
import {
  MD_DIALOG_DATA,
  MdDialogRef,
  OverlayContainer
} from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-new-project",
  templateUrl: "./new-project.component.html",
  styleUrls: ["./new-project.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title = "";
  coverImages = [];
  form: FormGroup;

  //将projectlist的值导入模态框内
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<NewProjectComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    //console.log(JSON.stringify(this.data));
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = "修改项目";
    } else {
      this.form = this.fb.group({
        name: ["", Validators.required],
        desc: [],
        coverImg: [this.data.img]
      });
      this.title = "创建项目";
    }
    this.coverImages = this.data.thumbnails;
    //console.log(this.coverImages);
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }
}
