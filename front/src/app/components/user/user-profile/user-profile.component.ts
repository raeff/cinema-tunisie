import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../Models/user";
import { UserProfileService } from "../../../Services/user-profile.service";
import { CookieService } from "ngx-cookie-service";
import { UserProfileRequest } from "../../../Models/user-profile-request";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  public userProfileForm: FormGroup;
  user: User;
  submitted = false;
  submitSuccess = false;
  request: UserProfileRequest = new UserProfileRequest();

  constructor(
    private router:Router,
    private userService: UserProfileService,
    private cookieService: CookieService
  ) {
    this.user = JSON.parse(this.cookieService.get("UserDetails")).user;
    this.userProfileForm = new FormGroup({
      firstname: new FormControl(
        { disabled: true, value: this.user.firstname },
        Validators.required
      ),
      lastname: new FormControl(
        { disabled: true, value: this.user.lastname },
        Validators.required
      ),
      email: new FormControl(
        { disabled: true, value: this.user.email },
        Validators.required
      ),
      phoneNo: new FormControl({ disabled: false, value: this.user.phoneNo }, [
        Validators.required,
        Validators.pattern("[0-9 ]{8}"),
      ]),

      username: new FormControl(
        { disabled: false, value: this.user.username },
        [Validators.required, Validators.minLength(4)]
      ),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  ngOnInit() {
    if (!JSON.parse(this.cookieService.get("UserDetails")))
    {
      this.router.navigate(["/login"]);

    }
  }

  /*Get all the user profile controls*/
  get f() {
    return this.userProfileForm.controls;
  }

  /*Submit user details. Request contains email and phone number*/
  submitUserDetails() {
    this.submitted = true;
    if (
      this.userProfileForm.invalid ||
      this.userProfileForm.get("password").value !=
        this.userProfileForm.get("confirmPassword").value
    ) {
      return;
    }
    this.request._id = this.user._id;
    this.request.username = this.userProfileForm.get("username").value;
    this.request.phoneNo = this.userProfileForm.get("phoneNo").value;
    this.request.password = this.userProfileForm.get("password").value;
    this.userService
      .updateUserDetails(
        this.request,
        JSON.parse(this.cookieService.get("UserDetails")).access_token
      )
      .subscribe(
        (result: any) => {
          this.user.email = this.userProfileForm.get("email").value;
          this.user.phoneNo = this.userProfileForm.get("phoneNo").value;
          this.user.password = this.userProfileForm.get("password").value;
          result = JSON.parse(this.cookieService.get("UserDetails"));
          result.user = this.user;
          /*Store the new values in cookie*/
          this.cookieService.set("UserDetails", JSON.stringify(result));
          if (result.status == 200) {
            this.submitSuccess = true;
            this.user = result.user;
            console.log(this.user);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
