import {
  Component,
  OnInit,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { MdDialog, MdDialogRef } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { slideToright } from "../../anims/router.anim";
import { listAnimation } from "../../anims/list.anim";
import { ProjectService } from "../../services/project.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  animations: [slideToright, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects;

  @HostBinding("@routeAnim") state;

  constructor(
    private dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService
  ) {}

  ngOnInit() {
    this.service$.get("1").subscribe(projects => (this.projects = projects));
  }

  openNewProjectDialog() {
    // this.dialog.open(NewProjectComponent, { width: "100px", height: "100px" });
    // this.dialog.open(NewProjectComponent, {
    //   position: { left: "0", top: "0" }
    // });

    // this.dialog.open(NewProjectComponent, {
    //   //将值传入模态框内
    //   data: "this is my data"
    // });
    const dialogRef = this.dialog.open(NewProjectComponent, {
      //将值传入模态框内
      data: { title: "新增项目" }
    });
    //订阅结果变化
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [
        //添加数组元素的新方法
        ...this.projects,
        {
          id: 3,
          name: "一新项目",
          desc: "这是一个新项目",
          coverImg: "assets/img/covers/8.jpg"
        },
        {
          id: 4,
          name: "一新项目",
          desc: "这是一个新项目",
          coverImg: "assets/img/covers/8.jpg"
        }
      ];
      this.cd.markForCheck();
    });
  }

  //project-item-->invite-->project-list
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      //将值传入模态框内
      data: { title: "编辑项目" }
    });
  }

  //project-item confirm-dialog project-list
  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      //将值传入模态框内
      data: { title: "删除项目", content: "您确认删除该项目吗？" }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}
