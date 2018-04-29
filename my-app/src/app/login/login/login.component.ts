import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { QuoteService } from "../../services/quote.service";
import { Quote } from "../../domain/quote";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = {
    cn:
      "我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。",
    en:
      "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.",
    pic: "/assets/img/quotes/0.jpg"
  };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$.getQuote().subscribe(q => (this.quote = q));
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
