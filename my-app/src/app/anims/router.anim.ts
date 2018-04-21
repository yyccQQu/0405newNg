import {
  trigger,
  state,
  transition,
  style,
  animate,
  keyframes,
  group
} from "@angular/animations";

export const slideToright = trigger("routeAnim", [
  state("void", style({ position: "fixed", width: "100%", height: "80%" })),
  state(
    "*", //切换到其他任意一种状态就是*
    style({
      position: "fixed",
      width: "100%",
      height: "80%"
    })
  ),
  // :enter :leave

  transition("void => *", [
    style({ transform: "translateX(-100%)", opacity: 0 }), //起始位置/状态
    //  animate(
    //    ".5s ease-in-out",
    //    style({ transform: "translateX(0)" })
    //  )
    group([
      //让一组动画同时执行
      animate(".5s ease-in-out", style({ transform: "translateX(0)" })),
      animate(".3s ease-in", style({ opacity: 1 }))
    ])
  ]),
  transition("* => void", [
    style({ transform: "translateX(0)", opacity: 1 }), //起始位置/状态
    group([
      //让一组动画同时执行
      animate(".5s ease-in-out", style({ transform: "translateX(100%)" })),
      animate(".3s ease-in", style({ opacity: 0 }))
    ])
  ])
]);
