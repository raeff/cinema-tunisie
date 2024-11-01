import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SignupRequest } from "../../../Models/signup-request";
import { SignUpService } from "../../../Services/sign-up.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { paymentUrl } from "../../../Models/paymentUrl";
import { DataService } from "../../../Services/data.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  cookievalue = null;

  errorMessage = "";
  isSignUpFailed = false;
  public signUpForm: FormGroup;
  submitted = false;
  request: SignupRequest = new SignupRequest();
  pUrl: paymentUrl = new paymentUrl();
  constructor(
    private signUpService: SignUpService,
    private cookieService: CookieService,
    private router: Router,
    private dataservice: DataService
  ) {}

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue)
    {
      this.router.navigate(["/home"]);

    }

    this.signUpForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNo: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9 ]{8}"),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  /*Get all the sign up controls*/
  get f() {
    return this.signUpForm.controls;
  }

  /*Sign up button action. Check validations and call signup api*/
  signUp() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.request.username = this.signUpForm.get("username").value;
    this.request.password = this.signUpForm.get("password").value;
    this.request.email = this.signUpForm.get("email").value;
    this.request.firstname = this.signUpForm.get("firstname").value;
    this.request.phoneNo = this.signUpForm.get("phoneNo").value;
    this.request.lastname = this.signUpForm.get("lastname").value;
    console.log(this.request);
    this.signUpService.signUp(this.request).subscribe(
      (result: any) => {
        this.router.navigate(["/login"]);
      },

      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
