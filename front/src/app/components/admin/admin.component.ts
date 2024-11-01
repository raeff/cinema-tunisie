import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../Models/user";
import { UserProfileService } from "../../Services/user-profile.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

import * as _ from "underscore";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  list: Array<User>;
  cookievalue = "unknown";
  adminContent: string;
  id = null;
  listAdmins = [];
  request: User;
  submitted = false;
  clicked = false;
  roleForm = {
    role: "",
  };
  constructor(
    private activatedroute: ActivatedRoute,
    public userservice: UserProfileService,
    public router: Router,
    private cookieService: CookieService
  ) {
    let users$: Observable<Array<User>> = userservice.get_Users();
    users$.subscribe((users) => {
      this.list = users;
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].role != "user" && this.list[i].role != "admin") {
          this.listAdmins.push(this.list[i]);
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
  deleteAdmin(userId) {
    this.userservice.delete_user(userId).subscribe((response) => {
      console.log(response);

      location.reload();
    });
  }

  userClick(id) {
    this.router.navigate(["/update", id]);
  }
}
