import { Component } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";
import { filter, map, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "BookMyMovie";

  showHead: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  visible: boolean = false;
  ngOnInit() {
    this.router.events
      .pipe(
        filter((events) => events instanceof NavigationEnd),
        map((evt) => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(
        filter((route) => route.outlet === "primary"),
        mergeMap((route) => route.data)
      )
      .subscribe((x) =>
        x.header === true ? (this.visible = true) : (this.visible = false)
      );
  }
}
