import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

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
