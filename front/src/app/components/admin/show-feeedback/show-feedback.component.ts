import { Component, OnInit } from "@angular/core";
import { ShowFeedbackService } from "../../../services/show-feedback.service";
import { Post } from "../../../Models/post";
import { CommonService } from "../../../services/common.service";
import { UserProfileService } from "../../../Services/user-profile.service";
import { User } from "../../../Models/user";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-show-feedback",
  templateUrl: "./show-feedback.component.html",
  styleUrls: ["./show-feedback.component.scss"],
})
export class ShowFeedBackComponent implements OnInit {
  public posts: any[];
  list: any[];
  cookievalue = "unknown";

  adminContent: string;
  constructor(
    private cookieService: CookieService,
    public userservice: UserProfileService,
    public showFeedbackService: ShowFeedbackService,
    private commonService: CommonService
  ) {
    // call to rest api to get user specific orders
    let posts$: Observable<Array<Post>> = showFeedbackService.get_Posts();
    posts$.subscribe((posts) => {
      this.list = posts;
      this.list.reverse();

      console.log(this.list);
    });
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.adminContent = null;
    } else {
      if (JSON.parse(this.cookievalue).user.role == "admin") {
        this.adminContent = JSON.parse(this.cookievalue).user.role;
      } else {
        this.adminContent = null;
      }
    }
  }
}
