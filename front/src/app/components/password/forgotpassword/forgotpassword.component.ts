import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ForgotPasswordRequest } from "../../../Models/forgot-password-request";
import { ForgotPasswordService } from "../../../Services/forgot-password.service";
import { ConfirmationDialogComponent } from "../../../shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material";
@Component({
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"],
})
export class ForgotpasswordComponent implements OnInit {
  //Initializing forgot password required
  request: ForgotPasswordRequest = new ForgotPasswordRequest();

  public forgotPassword: FormGroup;
  submitted = false;
  constructor(
    public dialog: MatDialog,
    private forgotPasswordService: ForgotPasswordService
  ) {}

  ngOnInit() {
    this.forgotPassword = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Please check your email for reset password link",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Yes clicked");
        // DO SOMETHING
      }
    });
  }

  get f() {
    return this.forgotPassword.controls;
  }

  //Forgot password api calling method
  sendEmail() {
    this.submitted = true;
    if (this.forgotPassword.invalid) {
      return;
    }
    this.request.email = this.forgotPassword.get("email").value;
    this.forgotPasswordService.forgotPassword(this.request).subscribe(
      (result: any) => {
        this.openDialog();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
