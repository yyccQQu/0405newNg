import { Component, OnInit, Input, forwardRef, OnDestroy } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { Observable } from "rxjs/Observable";
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse,
  format,
  isDate,
  isValid,
  isFuture
} from "date-fns";

import { toDate, isValidDate } from "../../utils/date.util";
import { Subscription } from "rxjs/Subscription";

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: "app-age-input",
  templateUrl: "./age-input.component.html",
  styleUrls: ["./age-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      //用已有的《useExisting》，在ImageListSelectComponent没有创建时，向前沿用《forwardRef》--》就是等待ImageListSelectComponent实例化之后，将ImageListSelectComponent注册到依赖池中去
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true //同时使用该令牌 NG_VALUE_ACCESSOR
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  dateOfBirth;
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;

  format = "YYYY-MM-DD";
  selectedUnit = AgeUnit.Year;
  form: FormGroup;
  ageUnits = [
    { value: AgeUnit.Year, label: "岁" },
    { value: AgeUnit.Month, label: "月" },
    { value: AgeUnit.Day, label: "天" }
  ];
  private propagateChange = (_: any) => {};
  sub: Subscription;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ["", this.validateDate],
      age: this.fb.group(
        {
          ageNum: [],
          ageUnit: [AgeUnit.Year]
        },
        { validator: this.validateAge("ageNum", "ageUnit") }
      )
    });
    const birthday = this.form.get("birthday");
    const ageNum = this.form.get("age").get("ageNum");
    const ageUnit = this.form.get("age").get("ageUnit");

    const birthday$ = birthday.valueChanges
      .map(d => {
        return { date: d, from: "birthday" }; //里面的from表示的是流的来源
      })
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();

    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();

    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({ age: _n, unit: _u });
    })
      .map(d => {
        return { date: d, from: "age" };
      })
      .filter(_ => this.form.get("age").valid);

    const merged$ = Observable.merge(birthday$, age$).filter(
      _ => this.form.valid
    );
    //判断是新数据从哪个源头来的
    this.sub = merged$.subscribe(d => {
      //先把出生日期input框的(日期)数据算成年龄
      const age = this.toAge(d.date);
      if (d.from === "birthday") {
        //当更新源为birthday时，this.toAge(d.date).age !== ageNum.value时
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {
            emitEvent: false
          });
        }

        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, {
            emitEvent: false
          });
        }
        //将值发布出去，让其他空间能够接受到变化更新的值
        this.propagateChange(d.date);
      } else {
        //当更新源从age这边来的时候，先把birthday转化成age
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date, { emitEvent: false });
          this.propagateChange(d.date);
        }
      }
    });
  }

  writeValue(obj: any): void {
    //得到外界设置的初始值，并将初始值设置到自己的控件当中
    if (obj) {
      const date = format(obj, this.format);
      this.form.get("birthday").patchValue(date);
      const age = this.toAge(date);
      this.form
        .get("age")
        .get("ageNum")
        .patchValue(age.age);
      this.form
        .get("age")
        .get("ageUnit")
        .patchValue(age.unit);
    }
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    if (isBefore(subDays(now, this.daysTop), date)) {
      return { age: differenceInDays(now, date), unit: AgeUnit.Day };
    } else if (isBefore(subMonths(now, this.monthsTop), date)) {
      return { age: differenceInMonths(now, date), unit: AgeUnit.Month };
    } else {
      return { age: differenceInYears(now, this.yearsTop), unit: AgeUnit.Year };
    }
  }

  toDate(age: Age): string {
    const now = new Date();
    const dateFormat = "YYYY-MM-DD";
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), dateFormat);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), dateFormat);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), dateFormat);
      }
      default: {
        return null;
        // return this.dateOfBirth;
      }
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe;
    }
  }

  //整个表单控件的验证
  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    };
  }

  validateDate(c: FormControl): any {
    //c类型为formControl，参数key类型为string，参数key对应值类型为any
    const val = c.value;
    return isValidDate(val) ? null : { birthdayInvalid: true };
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    //组合验证
    return (group: FormGroup): { [key: string]: any } => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          break;
        }
      }
      return result ? null : { ageInvalid: true };
    };
  }
}

//                   /(toAge)
// birthday: -------d,from---------d-------------d---------d-----
// ageNum:   ---an--------an----------an---------an-----an-- //ageNum和ageUnit结合在一起才能形成有意义的年龄 combineLatest
// ageUnit:  -------au--------au------------au--------au----
// age:              a    a    a   //合并得到年龄后
//                    \(toDate),from
//        由于birthday是一个日期流，age通过转化又是一个日期流，故又可合并为一个新的日期流！
//          -------d--d----d----d-----d-----d-d---d--d-d-d-- //合并之后需要区分新日期的来源，以决定数据改变的方向
//
//
//
