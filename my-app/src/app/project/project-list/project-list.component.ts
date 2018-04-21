import { Component, OnInit, HostBinding } from "@angular/core";
import { MdDialog, MdDialogRef } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { slideToright } from "../../anims/router.anim";
import { listAnimation } from "../../anims/list.anim";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  animations: [slideToright, listAnimation]
})
export class ProjectListComponent implements OnInit {
  @HostBinding("@routeAnim") state;

  projects = [
    {
      id: 1,
      name: "企业协作平台",
      desc: "这是一个企业内部项目",
      coverImg: "assets/img/covers/0.jpg"
    },
    {
      id: 2,
      name: "自动化测试项目",
      desc: "这是一个企业内部项目",
      coverImg: "assets/img/covers/1.jpg"
    }
  ];

  constructor(private dialog: MdDialog) {}

  ngOnInit() {}

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
    });
  }
}
