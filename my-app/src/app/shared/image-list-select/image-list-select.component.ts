import { Component, OnInit, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-image-list-select",
  templateUrl: "./image-list-select.component.html",
  styleUrls: ["./image-list-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      //用已有的《useExisting》，在ImageListSelectComponent没有创建时，向前沿用《forwardRef》--》就是等待ImageListSelectComponent实例化之后，将ImageListSelectComponent注册到依赖池中去
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true //同时使用该令牌 NG_VALUE_ACCESSOR
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {
  @Input() cols: number = 6;
  @Input() rowHeight = "64px";
  @Input() title = "选择";
  @Input() items: string[] = [];
  @Input() useSvgIcon: boolean = false;
  @Input() itemWidth = "80px";

  selected: string;
  constructor() {}
  private propagateChange = (_: any) => {};

  onChange(i) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);
  }

  writeValue(obj: any): void {
    this.selected = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  validate(c: FormControl): any {
    return this.selected
      ? null
      : {
          imageListInvalid: {
            valid: false
          }
        };
  }
}
