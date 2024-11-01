import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../../Models/user";
import { UserProfileService } from "../../../Services/user-profile.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

import * as _ from "underscore";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  list: Array<User>;
  listUsers = [];
  cookievalue = "unknown";
  adminContent: string;
  id = null;

  email = "";
  aa: boolean = false;

  request: User;
  submitted = false;
  clicked = false;
  roleForm = {
    role: "",
  };
  searchString: string;

  constructor(
    public userservice: UserProfileService,
    public router: Router,
    private cookieService: CookieService
  ) {
    let users$: Observable<Array<User>> = userservice.get_Users();
    users$.subscribe((users) => {
      this.list = users;
      for (var i = 0; i < this.list.length; i++) {
        if (
          this.list[i].role != "redactor" &&
          this.list[i].role != "moderator" &&
          this.list[i].role != "admin"
        ) {
          this.listUsers.push(this.list[i]);
        }
      }
    });
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (JSON.parse(this.cookievalue).user.role == "admin") {
      this.adminContent = JSON.parse(this.cookievalue).user.role;
    } else {
      this.adminContent = null;
    }
  }
  userClick(id) {
    this.router.navigate(["/update", id]);
  }
  userOrderClick(userId) {
    this.router.navigate(["/orderhistoryadmin", userId]);
  }
}
