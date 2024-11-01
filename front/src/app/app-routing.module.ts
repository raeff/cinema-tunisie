import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PaymentComponent } from "./components/user/payment/payment.component";
import { ScannerComponent } from "./components/admin/scanner/scanner.component";
import { AllMoviesComponent } from "./components/movies/all-movies/all-movies.component";
import { HeaderComponent } from "./components/header/header.component";
import { CarouselDivComponent } from "./components/movies/carousel-div/carousel-div.component";
import { MoviesShowingComponent } from "./components/movies/movies-showing/movies-showing.component";
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
import { UsersComponent } from "./components/admin/users/users.component";
import { StatsComponent } from "./components/admin/stats/stats.component";
const routes: Routes = [
  {
    path: "movie/:movieId",
    component: MovieSingleComponent,
    data: { title: "movie" },
  },

  {
    path: "seatselection",
    component: SeatSelectionComponent,
    data: { title: "shows" },
  },
  {
    path: "seatselection2",
    component: SeatSelection2Component,
    data: { title: "shows2" },
  },
  {
    path: "seatselection3",
    component: SeatSelection3Component,
    data: { title: "shows3" },
  },
  {
    path: "seatselection4",
    component: SeatSelection4Component,
    data: { title: "shows4" },
  },
  {
    path: "header",
    component: HeaderComponent,
  },

  {
    path: "movies",
    component: MoviesShowingComponent,
    data: { title: "Movies" },
  },
  {
    path: "soon",
    component: CarouselDivComponent,
  },

  {
    path: "payment",
    component: PaymentComponent,
    data: { title: "Payment Form" },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login " },
  },
  {
    path: "signup",
    component: SignupComponent,
    data: { title: "Sign up" },
  },
  {
    path: "forgotpassword",
    component: ForgotpasswordComponent,
    data: { title: "Forgot password" },
  },
  {
    path: "resetpassword/:token",
    component: ResetPasswordComponent,
    data: { title: "Reset password" },
  },
  {
    path: "customerreview",
    component: MovieReviewComponent,
    data: { title: "Forgot password" },
  },
  { path: "", redirectTo: "/movies", pathMatch: "full" },
  {
    path: "orderhistory",
    component: UserTicketsComponent,
    data: { title: "Order History " },
  },
  {
    path: "orderhistoryadmin/:userId",
    component: UsersTicketsComponent,
    data: { title: "Order History admin" },
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    data: { title: "User Profile" },
  },
  {
    path: "user-review-list",
    component: ReviewListComponent,
    data: { title: "User Review List" },
  },
  {
    path: "redactor",
    component: MovieAddComponent,
    data: { title: "Redactor" },
  },
  {
    path: "redactor/:movieId",
    component: MovieUpdateComponent,
    data: { title: "Redactor" },
  },
  {
    path: "moderator/:id",
    component: AddShowtimeComponent,
    data: { title: "moderator" },
  },
  {
    path: "moderator-update/:showtimeId",
    component: UpdateShowtimeComponent,
    data: { title: "moderator" },
  },
  {
    path: "cinemas/:id",
    component: CinemaComponent,
    data: { title: "cinemas" },
  },
  { path: "admin", component: AdminComponent, data: { title: "admin" } },
  { path: "users", component: UsersComponent, data: { title: "users" } },
  {
    path: "update/:id",
    component: UpdateUserComponent,
    data: { title: "update" },
  },

  { path: "home", component: HomeComponent, data: { title: "soon" } },
  {
    path: "feedback",
    component: AddFeedbackComponent,
    data: { title: "feedback" },
  },
  { path: "posts", component: ShowFeedBackComponent, data: { title: "posts" } },

  {
    path: "stats",
    component: StatsComponent,
  },

  {
    path: "scanner",
    component: ScannerComponent,
  },

  {
    path: "all-movies",
    component: AllMoviesComponent,
  },

  {
    path: "**",
    pathMatch: "full",
    component: PageNotFoundComponent,
    data: { header: false },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
