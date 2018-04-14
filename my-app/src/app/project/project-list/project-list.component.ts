import { Component, OnInit } from "@angular/core";
import { MdDialog, MdDialogRef } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"]
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      name: "企业协作平台",
      desc: "这是一个企业内部项目",
      coverImg: "assets/img/covers/0.jpg"
    },
    {
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
      data: { dark: true }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}
