import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import {
  extractInfo,
  getAddrByCode,
  isValidAddr
} from "../../utils/identity.util";
import { isValidDate, toDate } from "../../utils/date.util";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit, OnDestroy {
  items: string[];
  form: FormGroup;

  private readonly avatarName = "avatars";
  private _sub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.items = nums.map(d => `avatars:svg-${d}`);

    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;

    this.form = this.fb.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(20)])
      ],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(20)])
      ],
      repeat: ["", Validators.required],
      avatar: [img],
      dateOfBirth: ["1990-01-01"],
      address: ["", Validators.maxLength(80)],
      identity: []
    });

    const id$ = this.form
      .get("identity")
      .valueChanges.debounceTime(300)
      .filter(v => this.form.get("identity").valid);

    this._sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.patchValue({ address: addr });
        this.form.updateValueAndValidity({
          onlySelf: true,
          emitEvent: true
        });
      }
      if (isValidDate(info.dateOfBirth)) {
        const date = info.dateOfBirth;
        this.form.patchValue({ dateOfBirth: date });
        this.form.updateValueAndValidity({
          onlySelf: true,
          emitEvent: true
        });
      }
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }
}
