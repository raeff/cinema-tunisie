import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { AgmCoreModule } from "@agm/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
} from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

import { Ng2CarouselamosModule } from "ng2-carouselamos";
import { CookieService } from "ngx-cookie-service";
import { NgxPaginationModule } from "ngx-pagination";
import {
  NgbModule,
  NgbPaginationModule,
  NgbAlertModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FeedbackModule } from "ng-feedback";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import {
  CategoryService,
  ColumnSeriesService,
  ChartModule,
} from "@syncfusion/ej2-angular-charts";

import { Order_Service } from "./Services/order.service";
import { Review_Service } from "./Services/review.service";
import { CommonService } from "./Services/common.service";
import { LoginService } from "./Services/login.service";
import { MovieService } from "./Services/movie.service";
import { TheaterService } from "./Services/theater.service";
import { ShowTimeService } from "./Services/showtime.service";
import { SignUpService } from "./Services/sign-up.service";
import { MovieSingle_Service } from "./Services/moviesingle.service";
import { ForgotPasswordService } from "./Services/forgot-password.service";
import { UserProfileService } from "./Services/user-profile.service";
import { RedactorService } from "./Services/redactor.service";

import { AppComponent } from "./app.component";
import { PaymentComponent } from "./components/user/payment/payment.component";
import { ScannerComponent } from "./components/admin/scanner/scanner.component";
import { AllMoviesComponent } from "./components/movies/all-movies/all-movies.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CarouselDivComponent } from "./components/movies/carousel-div/carousel-div.component";
import { MoviesShowingComponent } from "./components/movies/movies-showing/movies-showing.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AlertComponent } from "./shared/alert/alert.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { LoginComponent } from "./components/signup-login/login/login.component";
import { SignupComponent } from "./components/signup-login/signup/signup.component";
import { ForgotpasswordComponent } from "./components/password/forgotpassword/forgotpassword.component";
import { UserTicketsComponent } from "./components/user/user-tickets/user-tickets.component";
import { SeatSelectionComponent } from "./components/cinema/cinemas-seats/seat-selection/seat-selection.component";
import { SeatSelection2Component } from "./components/cinema/cinemas-seats/seat-selection2/seat-selection2.component";
import { SeatSelection3Component } from "./components/cinema/cinemas-seats/seat-selection3/seat-selection3.component";
import { SeatSelection4Component } from "./components/cinema/cinemas-seats/seat-selection4/seat-selection4.component";
import { MovieReviewComponent } from "./components/user/movie-review/movie-review.component";
import { MovieSingleComponent } from "./components/movies/movie-single/movie-single.component";
import { ResetPasswordComponent } from "./components/password/reset-password/reset-password.component";
import { UserProfileComponent } from "./components/user/user-profile/user-profile.component";
import { ReviewListComponent } from "./components/movies/movie-review-list/review-list.component";
import { CinemaComponent } from "./components/cinema/cinema-single/cinema.component";
import { AdminComponent } from "./components/admin/admin.component";
import { UpdateUserComponent } from "./components/admin/update-user/update-user.component";
import { MovieAddComponent } from "./components/redactor/movie-add/movie-add.component";
import { MovieUpdateComponent } from "./components/redactor/movie-update/movie-update.component";
import { UpdateShowtimeComponent } from "./components/moderator/update-showtime/update-showtime.component";
import { AddShowtimeComponent } from "./components/moderator/add-showtime/add-showtime.component";
import { HomeComponent } from "./components/home/home.component";
import { UsersTicketsComponent } from "./components/admin/users-tickets/users-tickets.component";
import { AddFeedbackComponent } from "./components/user/add-feedback/add-feedback.component";
import { ShowFeedBackComponent } from "./components/admin/show-feeedback/show-feedback.component";
import { ConfirmationDialogComponent } from "./shared/confirmation-dialog/confirmation-dialog.component";
import { UsersComponent } from "./components/admin/users/users.component";
import { StatsComponent } from "./components/admin/stats/stats.component";

import { AppRoutingModule } from "./app-routing.module";
import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";
import { Material } from "./app-material";
import { SafetypipePipe } from "./safetypipe.pipe";
import { FilterPipe } from "./shared/pipe/filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    HeaderComponent,
    FooterComponent,
    CarouselDivComponent,
    MoviesShowingComponent,
    PageNotFoundComponent,
    SeatSelectionComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    UserTicketsComponent,
    MovieReviewComponent,
    MovieSingleComponent,
    FilterPipe,
    ResetPasswordComponent,
    UserProfileComponent,
    ReviewListComponent,
    LoadingSpinnerComponent,
    SafetypipePipe,
    AddShowtimeComponent,
    UpdateShowtimeComponent,
    MovieUpdateComponent,
    MovieAddComponent,
    CinemaComponent,
    AdminComponent,
    UpdateUserComponent,
    SeatSelection2Component,
    SeatSelection3Component,
    SeatSelection4Component,
    HomeComponent,
    UsersTicketsComponent,
    AddFeedbackComponent,
    ShowFeedBackComponent,
    ConfirmationDialogComponent,
    UsersComponent,
    StatsComponent,
    ScannerComponent,
    AllMoviesComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    Ng2CarouselamosModule,
    NgbPaginationModule,
    NgbAlertModule,
    FeedbackModule,
    Material,
    AgmCoreModule.forRoot({ apiKey: "" }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    NgxQRCodeModule,
    MDBBootstrapModule.forRoot(),
    ChartModule,
    // Angular
  ],
  schemas: [NO_ERRORS_SCHEMA],

  providers: [
    Order_Service,
    LoginService,
    CookieService,
    MovieSingle_Service,
    MovieService,
    SignUpService,
    ForgotPasswordService,
    TheaterService,
    ShowTimeService,
    UserProfileService,
    Review_Service,
    DatePipe,
    RedactorService,
    CommonService,
    CategoryService,
    ColumnSeriesService,
  ],

  entryComponents: [ConfirmationDialogComponent, AlertComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
