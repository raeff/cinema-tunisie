import { Component, OnInit } from "@angular/core";
import { User } from "../../../Models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { UserProfileService } from "../../../Services/user-profile.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.scss"],
})
export class UpdateUserComponent implements OnInit {
  list = ["admin", "moderator", "redactor"];
  id: string;
  user: User;
  selectedUser;
  cookievalue = "unknown";
  admin = false;

  constructor(
    private activatedroute: ActivatedRoute,
    public userservice: UserProfileService,
    public route: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.cookievalue = null;
    } else {
      if (JSON.parse(this.cookievalue).user.role == "admin") {
        this.admin = true;
      }
    }

    this.user = new User();

    this.id = this.activatedroute.snapshot.params["id"];

    this.userservice.getUser(this.id).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
      },
      (error) => console.log(error)
    );
  }
  onSelectionChange(entry) {
    this.selectedUser = entry;
  }
  updateUser() {
    this.user.role = this.selectedUser;
    this.userservice.updateUser(this.id, this.user).subscribe(
      (data) => {
        this.userservice.getUser(data._id).subscribe((user) => {
          console.log(user);
        });
        this.user = new User();
        this.gotoList();
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.updateUser();
  }

  gotoList() {
    this.route.navigate(["/admin"]);
  }
}
