import { Component, OnInit } from "@angular/core";
import { DataService } from "../../Services/data.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  cookievalue = "unknown";
  adminContent = false;
  userContent = false;
  adminModRedact = false;

  constructor(
    public dataservice: DataService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");

    if (JSON.parse(this.cookievalue).status == 403) {
      this.cookievalue = null;
    } else {
      this.dataservice.setisDisplayname(
        `${JSON.parse(this.cookievalue).user.firstname}      ${
          JSON.parse(this.cookievalue).user.lastname
        }`
      );
      if (JSON.parse(this.cookievalue).user.role == "admin") {
        this.adminContent = true;
      }

      if (
        JSON.parse(this.cookievalue).user.role == "redactor" ||
        JSON.parse(this.cookievalue).user.role == "moderator" ||
        JSON.parse(this.cookievalue).user.role == "admin"
      ) {
        this.adminModRedact = true;
      }

      if (JSON.parse(this.cookievalue).user.role == "user") {
        this.userContent = true;
      }
    }
  }

  signOut(): void {
    this.cookieService.delete("UserDetails");
  }
  logout(): void {
    this.signOut();
    location.replace("/login");
  }
}
