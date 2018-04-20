import { Component } from "@angular/core";
import { OverlayContainer } from "@angular/material";
import {
  trigger,
  state,
  transition,
  style,
  animate,
  keyframes
} from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("square", [
      state(
        "green",
        style({
          background: "green",
          height: "100px",
          transform: "translateY(-100%)"
        })
      ),
      state(
        "red",
        style({
          background: "red",
          height: "50px",
          transform: "translateY(100%)"
        })
      ),
      // transition("green => red", animate(".2s 1s")),
      // transition("red => green", animate(1000))
      transition(
        "green => red",
        animate(".8s cubic-bezier(0.175, 0.885, 0.32, 1.275)")
      ),
      transition(
        "red => green",
        animate(
          5000,
          keyframes([
            style({ transform: "translateY(100%)" }),
            style({ transform: "translateY(98%)" }),
            style({ transform: "translateY(95%)" }),
            style({ transform: "translateY(90%)" }),
            style({ transform: "translateY(80%)" }),
            style({ transform: "translateY(60%)" }),
            style({ transform: "translateY(30%)" }),
            style({ transform: "translateY(0%)" }),
            style({ transform: "translateY(-10%)" }),
            style({ transform: "translateY(-5%)" }),
            style({ transform: "translateY(-2%)" }),
            style({ transform: "translateY(0%)" }),
            style({ transform: "translateY(10%)" }),
            style({ transform: "translateY(15%)" }),
            style({ transform: "translateY(-15%)" }),
            style({ transform: "translateY(-40%)" }),
            style({ transform: "translateY(-80%)" }),
            style({ transform: "translateY(-90%)" }),
            style({ transform: "translateY(-95%)" }),
            style({ transform: "translateY(100%)" })
          ])
        )
      )
    ])
  ]
})
export class AppComponent {
  darkTheme = false;
  squareState: string;

  constructor(private oc: OverlayContainer) {}

  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.themeClass = dark ? "myapp-dark-theme" : null;
  }

  onClick() {
    this.squareState = this.squareState === "red" ? "green" : "red";
  }
}
