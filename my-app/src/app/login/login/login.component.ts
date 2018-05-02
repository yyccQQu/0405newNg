import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { QuoteService } from "../../services/quote.service";
import { Quote } from "../../domain/quote";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as actions from "../../actions/quote.action";
import { QUOTE_SUCCESS } from "../../actions/quote.action";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(
    private fb: FormBuilder,
    private quoteService$: QuoteService,
    private store$: Store<fromRoot.State>
  ) {
    //store$除了发射，还可以取得最新的状态
    this.quote$ = this.store$.select(state => state.quote.quote);
    this.quoteService$.getQuote().subscribe(q => {
      this.store$.dispatch({ type: actions.QUOTE_SUCCESS, payload: q });
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [
        "wpcfan@163.com",
        Validators.compose([
          Validators.required,
          Validators.email,
          this.validate
        ])
      ],
      password: ["wp123456", Validators.required]
    });
  }

  onSubmit({ value, valid }, e: Event) {
    e.preventDefault();
    //动态添加验证方法
    this.form.controls["email"].setValidators(this.validatee);
    if (!valid) {
      return;
    }
    console.log(JSON.stringify(value), valid);
  }

  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return;
    }
    const reg = /^wang+/;
    if (reg.test(c.value)) {
      return null;
    } else {
      return {
        emailNotValid: "The email must start with wang"
      };
    }
  }
  validatee(c: FormControl): any {
    if (!c.value) {
      return;
    }
    const reg = /^wang233+/;
    if (reg.test(c.value)) {
      return null;
    } else {
      return { emailNotValid: "The email must start with wang233" };
    }
  }
}
