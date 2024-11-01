import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Location } from "@angular/common";
import { loginRequest } from "../../../Models/user";
import { LoginService } from "../../../Services/login.service";
import { CookieService } from "ngx-cookie-service";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../../../Services/data.service";
import { paymentUrl } from "../../../Models/paymentUrl";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  cookievalue = null;
  request: loginRequest = new loginRequest();
  loginService: LoginService;
  public loginForm: FormGroup;

  isLoginFailed = false;
  submitted = false;
  pUrl: paymentUrl = new paymentUrl();
  aUrl = null;
  Url;
  constructor(
    private location: Location,
    private lg: LoginService,
    private cookieService: CookieService,
    private router: Router,
    private dataservice: DataService
  ) {
    this.loginService = lg;
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue)
    {
      this.router.navigate(["/home"]);

    }

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  /*Authenticate user. This will check if the entered elements are valid. If the elements are valid then login api is called*/
  authenticate() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.request.username = this.loginForm.get("username").value;
    this.request.password = this.loginForm.get("password").value;
    this.loginService.login(this.request).subscribe(
      (result: any) => {
        this.cookieService.set("UserDetails", JSON.stringify(result));
        this.cookievalue = this.cookieService.get("UserDetails");
        console.log(this.cookievalue);
        if (JSON.parse(this.cookievalue).status == 403) {
          this.isLoginFailed = true;
          this.cookievalue = null;
        } else {
          this.dataservice.setisDisplayname(
            `${JSON.parse(this.cookievalue).user.firstname}      
            ${JSON.parse(this.cookievalue).user.lastname}`
          );
          this.dataservice.setIsSignup(false);
          this.pUrl = this.dataservice.getpUrl();
          this.aUrl = this.dataservice.getRecentRoute();
          if (this.pUrl == undefined && this.aUrl == null) {
            location.replace("/home");
          } else if (this.aUrl != null) {
            this.Url = `/${this.aUrl.data.title}/${this.aUrl.params.movieId}`;
            location.replace(this.Url);
          } else {
            this.router.navigate(["/payment"]);
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  refresh(): void {
    window.location.reload();
  }
  /*Navigate to forgot password page*/
  forgotPassword() {
    this.router.navigate(["/forgotpassword"]);
  }
}
