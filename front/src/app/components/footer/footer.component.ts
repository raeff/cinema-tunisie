import { Component, OnInit } from "@angular/core";
import { DataService } from "../../Services/data.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  cookievalue = "unknown";
  userContent;
  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.cookievalue = null;
      this.userContent = null;
    } else {
      if (JSON.parse(this.cookievalue).user.role == "user") {
        this.userContent = JSON.parse(this.cookievalue).user.role;
      } else {
        this.userContent = null;
      }
    }
  }
}
