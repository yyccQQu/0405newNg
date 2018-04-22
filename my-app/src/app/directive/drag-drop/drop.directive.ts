import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input
} from "@angular/core";

@Directive({
  selector: "[app-droppable]"
})
export class DropDirective {
  @Input() dragEnterClass: string;

  constructor(private el: ElementRef, private rd: Renderer2) {}

  private _isDraggble = false;

  @HostListener("dragenter", ["$event"])
  onDragEnter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  @HostListener("dragover", ["$event"])
  onDragOver(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
    }
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  @HostListener("drop", ["$event"])
  onDrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }
}
