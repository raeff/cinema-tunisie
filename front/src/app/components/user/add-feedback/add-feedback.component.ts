import { Component, OnInit } from "@angular/core";
import { AddFeedbackService } from "../../../Services/add-feedback..service";
import { Post } from "../../../models/post";

import { CommonService } from "../../../services/common.service";

import { FormControl, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { UserProfileService } from "../../../Services/user-profile.service";
import { CookieService } from "ngx-cookie-service";
import { ConfirmationDialogComponent } from "../../../shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material";
@Component({
  selector: "app-add-post",
  templateUrl: "./add-feedback.component.html",
  styleUrls: ["./add-feedback.component.scss"],
})
export class AddFeedbackComponent implements OnInit {
  public post: Post;
  cookievalue = "unknown";
  id;
  email;
  submitSuccess = false;
  userContent;
  loading = false;
  buttonText = "Send";
  submitted = false;

  messageFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4),
  ]);
  constructor(
    public dialog: MatDialog,
    private addPostService: AddFeedbackService,
    private commonService: CommonService,
    public userservice: UserProfileService,
    public router: Router,
    private cookieService: CookieService
  ) {
    this.post = {
      userid: "",
      description: "",
      date: null,
    };
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");

    if (!this.cookievalue) {
      this.userContent = null;
    } else {
      if (JSON.parse(this.cookievalue).user.role == "user") {
        this.post.userid = JSON.parse(this.cookievalue).user._id;

        this.userContent = JSON.parse(this.cookievalue).user.role;
      } else {
        this.userContent = null;
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Description required",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Yes clicked");
        // DO SOMETHING
      }
    });
  }
  textClick() {
    this.submitted = false;
    this.submitSuccess = false;

  }
  addFeedback() {
    this.post.description = this.messageFormControl.value;
    this.post.date = new Date();

    this.submitted = true;
    this.loading = true;
    this.buttonText = "Loading...";
    this.messageFormControl.hasError("minlength");
    if (this.messageFormControl.hasError("minlength")) {
      this.loading = false;
      this.buttonText = "send";
      this.openDialog();
    } else {
      this.addPostService.addPost(this.post).subscribe(() => {
        this.loading = false;
        this.buttonText = "send";
        this.submitSuccess = true;
      });
    }
  }
}
