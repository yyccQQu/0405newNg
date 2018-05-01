import {
  Component,
  OnInit,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { MdDialog, MdDialogRef } from "@angular/material";
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { slideToright } from "../../anims/router.anim";
import { listAnimation } from "../../anims/list.anim";
import { ProjectService } from "../../services/project.service";
import { Project } from "../../domain";
import * as _ from "lodash";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
  animations: [slideToright, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>;
  projects;
  listAnim$: Observable<number>;
  @HostBinding("@routeAnim") state;
  sub: Subscription;
  constructor(
    private dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService
  ) {
    //this.listAnim$ = this.projects$.map(p => p.length);
  }

  ngOnInit() {
    this.sub = this.service$.get("1").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck(); //不需要脏值检测
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(
      Math.random() * 40
    )}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, {
      //将值传入模态框内
      data: { thumbnails: this.getThumbnails(), img: selectedImg }
    });
    //订阅结果变化 实现post方法需使用高阶rxjs switchMap方法，即允许流内流
    dialogRef
      .afterClosed()
      .take(1) //取一个值后自动关闭
      .filter(n => n) //筛选确定有值
      //遍历之后重新赋值 ，将得到的val数组展开，然后重新给其coverImg属性赋值
      .map(val => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
      });
  }

  //project-item-->invite-->project-list
  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, {
      data: { members: [] }
    });
  }

  launchUpdateDialog(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      //将值传入模态框内
      data: { thumbnails: this.getThumbnails(), project: project }
    });
    //订阅结果变化 实现post方法需使用高阶rxjs switchMap方法，即允许流内流
    dialogRef
      .afterClosed()
      .take(1) //取一个值后自动关闭
      .filter(n => n) //筛选确定有值
      //遍历之后重新赋值 ，将得到的val数组展开，然后重新给其coverImg属性赋值
      .map(val => ({
        ...val,
        id: project.id,
        coverImg: this.buildImgSrc(val.coverImg)
      }))
      .switchMap(v => this.service$.update(v))
      .subscribe(project => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects = [
          ...this.projects.slice(0, index),
          project,
          ...this.projects.slice(index + 1)
        ];
        this.cd.markForCheck();
      });
  }

  //project-item confirm-dialog project-list
  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      //将值传入模态框内
      data: { title: "删除项目", content: "您确认删除该项目吗？" }
    });
    dialogRef
      .afterClosed()
      .take(1) //取一个值后自动关闭
      .filter(n => n) //筛选确定有值
      .switchMap(_ => this.service$.del(project))
      .subscribe(prj => {
        this.projects = this.projects.filter(p => p.id !== prj.id);
        this.cd.markForCheck();
      });
  }

  getThumbnails() {
    return _.range(0, 40).map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  buildImgSrc(img: string): string {
    return img.indexOf("_") > -1 ? img.split("_")[0] + ".jpg" : img;
  }
}
