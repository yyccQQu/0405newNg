import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  items: string[];
  form: FormGroup;

  private readonly avatarName = "avatars";

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
      dateOfBirth: [""],
      address: ["", Validators.maxLength(80)],
      identity: []
    });
  }

  onSubmit({ value, valid }, ev: Event) {}
}
