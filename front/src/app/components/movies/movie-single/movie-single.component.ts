import {
  Component,
  OnInit,
  HostListener,
  ComponentFactoryResolver,
  ViewChild,
} from "@angular/core";
import { MovieSingle_Service } from "../../../Services/moviesingle.service";
import { showTime } from "../../../Models/showtime";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { stringify } from "@angular/core/src/render3/util";
import { movie } from "../../../Models/movie";
import { User } from "../../../Models/user";
import { MovieService } from "../../../Services/movie.service";
import { Review_Service } from "../../../Services/review.service";
import { review } from "../../../Models/review";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
} from "@ng-bootstrap/ng-bootstrap";
import { TheaterService } from "../../../Services/theater.service";
import { CookieService } from "ngx-cookie-service";
import { ShowTimeService } from "../../../Services/showtime.service";
import { DataService } from "../../../Services/data.service";
import { UserProfileService } from "../../../Services/user-profile.service";
import * as _ from "underscore";

import { DatePipe } from "@angular/common";

import { MatDialog } from "@angular/material";

import { AlertComponent } from "../../../shared/alert/alert.component";
import { PlaceholderDirective } from "../../../shared/placeholder/placeholder.directive";
import { any } from "underscore";

@Component({
  selector: "app-movie-single",
  templateUrl: "./movie-single.component.html",
  styleUrls: ["./movie-single.component.scss"],
})
export class MovieSingleComponent implements OnInit {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  cookievalue = "unknown";
  adminMod = false;
  userContent = false;
  notContent = false;
  user: User;
  list2: Array<review>;
  list_showtimes: Array<showTime> = [];
  voteMoy = 0;
  loading = true;
  dateModel: NgbDate;
  movie: movie;
  selectedShowId: string;
  result: any[];
  movieId: string;
  theatreId: string;
  showtime: string;
  showtimeDate: string;

  theatreName: string;
  url: String;

  minDate: NgbDate;
  maxDate: NgbDate;
  isOn: boolean = false;
  list: Array<review>;
  userNames = [];
  dates = [];

  weekDates = [];
  public movieName: String;
  public rating: String;
  public movieLength: String;
  public directorName: String;
  public movieReleaseDate: String;
  public movieType: String;
  public language: String;
  public synopsis: String;

  public movieIdentifier: string;

  ratemoy;
  currentRate = 0;
  reviewsNumber;
  posted: boolean = false;

  pipe = new DatePipe("en-US");
  today = new Date();
  selectedDate = new Date();
  route;
  review;

  @HostListener("window:beforeunload", ["$event"])
  beforeunloadHandler(event) {
    return false;

    //I have used return false but you can your other functions or any query or condition
  }
  constructor(
    public datePipe: DatePipe,
    public dialog: MatDialog,
    private ds: DataService,
    private theaterService: TheaterService,
    private userService: UserProfileService,
    private cookieService: CookieService,
    public moviesingle_service: MovieSingle_Service,
    public movieservice: MovieService,
    private ac: ActivatedRoute,
    private router: Router,
    private AcRoute: ActivatedRoute,
    private calendar: NgbCalendar,
    public reviewService: Review_Service,
    public showTimeService: ShowTimeService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.route = AcRoute.snapshot;
    this.movieId = this.ac.snapshot.params["movieId"];

    this.isOn = false;
    //get movie-single
    let movies$: Observable<movie> = movieservice.get_single_Movie(
      this.movieId
    );
    movies$.subscribe((movies) => {
      this.movie = movies;

      this.movieName = this.movie.movieName;
      this.rating = this.movie.rating;

      this.movieLength = this.movie.movieLength;

      this.directorName = this.movie.directorName;
      this.language = this.movie.language;
      this.movieReleaseDate = this.movie.movieReleaseDate;
      this.movieType = this.movie.movieType;
      this.synopsis = this.movie.synopsis;

      this.movieIdentifier = this.movieId;
      this.url = this.movie.movieURL;
      console.log(this.movie.movieURL);
    });

    let showtimes$: Observable<Array<showTime>> =
      this.moviesingle_service.getshowTimes(this.movieId);
    showtimes$.subscribe((showtimes) => {
      var today = new Date();
      this.maxDate = new NgbDate(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate() + 6
      );
      this.dateModel = new NgbDate(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      this.minDate = new NgbDate(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );

      this.selectedDate = today;
      var selectDate = this.pipe.transform(this.selectedDate, "MM/dd/yyyy");

      for (var i = 0; i < showtimes.length; i++) {
        var date = this.pipe.transform(showtimes[i].date, "MM/dd/yyyy");

        if (date == selectDate) {
          this.list_showtimes.push(showtimes[i]);
        }
      }
      var groups = new Set(
        this.list_showtimes.map((item) => item["theatreRef"].theatreName)
      );
      this.result = [];
      groups.forEach((g) =>
        this.result.push({
          name: g,
          values: this.list_showtimes.filter(
            (i) => i["theatreRef"].theatreName === g
          ),
        })
      );
    });

    //get reviews
    this.getReviewList();
  }

  ngOnInit() {
    let reviews$: Observable<Array<review>> =
      this.reviewService.getReviewsForMovie(this.movieId);
    reviews$.subscribe((reviews) => {
      this.list = reviews;
      console.log(this.list);
      this.list = _.sortBy(this.list, "date").reverse();

      for (var i = 0; i < this.list.length; i++) {
        var id = this.list[i].userid;
        this.userService.getUser(id).subscribe((user) => {
          this.userNames.push(user.username);
        });
      }

      this.cookievalue = this.cookieService.get("UserDetails");
      if (!this.cookievalue) {
        this.cookievalue = null;
        this.loading = false;
      } else {
        if (
          JSON.parse(this.cookievalue).user.role == "moderator" ||
          JSON.parse(this.cookievalue).user.role == "admin"
        ) {
          this.adminMod = true;
        } else if (JSON.parse(this.cookievalue).user.role == "user") {
          this.userContent = true;
        }
      }
      if (this.cookievalue) {
        this.user = JSON.parse(this.cookieService.get("UserDetails")).user;
        let reviews2$: Observable<Array<review>> =
          this.reviewService.getReviewsForUser(this.user._id);
        reviews2$.subscribe((reviews2) => {
          this.list2 = reviews2;
          for (var i = 0; i < this.list.length; i++) {
            for (var j = 0; j < this.list2.length; j++) {
              if (this.list[i]._id == this.list2[j]._id) {
                this.posted = true;
                this.loading = false;
                break;
              }
            }
          }
          this.loading = false;
        });
      }
    });
  }

  getReviewList() {
    let reviews$: Observable<Array<review>> =
      this.reviewService.getReviewsForMovie(this.movieId);
    reviews$.subscribe((reviews) => {
      this.list = reviews;
      var sum = 0;
      this.reviewsNumber = this.list.length;
      for (var i = 0; i < this.list.length; i++) {
        sum += this.list[i].rating;
      }

      this.ratemoy = sum / this.list.length;
      console.log(this.ratemoy);
      this.ratemoy = Math.round(this.ratemoy);
      this.list = _.sortBy(this.list, "date").reverse();

      for (var i = 0; i < this.list.length; i++) {
        var id = this.list[i].userid;
        this.userService.getUser(id).subscribe((user) => {
          this.userNames.push(user.username);
        });
      }
    });
  }

  onSelect(evt: any) {
    this.list_showtimes = [];

    let showtimes$: Observable<Array<showTime>> =
      this.moviesingle_service.getshowTimes(this.movieId);
    showtimes$.subscribe((showtimes) => {
      this.selectedDate = new Date(evt.year, evt.month - 1, evt.day);
      var selectDate = this.pipe.transform(this.selectedDate, "MM/dd/yyyy");
      this.showtimeDate = selectDate;
      for (var i = 0; i < showtimes.length; i++) {
        var date = this.pipe.transform(showtimes[i].date, "MM/dd/yyyy");

        if (date == selectDate) {
          this.list_showtimes.push(showtimes[i]);
        }
      }

      var groups = new Set(
        this.list_showtimes.map((item) => item["theatreRef"].theatreName)
      );
      this.result = [];
      groups.forEach((g) =>
        this.result.push({
          name: g,
          values: this.list_showtimes.filter(
            (i) => i["theatreRef"].theatreName === g
          ),
        })
      );
    });
  }
  updateMovie(showtimeId) {
    this.router.navigate(["/moderator-update", showtimeId]);
  }

  getTheaterdetails(id) {
    this.router.navigate(["cinemas", id]);
  }

  selectShowtime(showid, theatreid, showtime, showtimeDate) {
    this.selectedShowId = showid;
    this.theatreId = theatreid;
    this.showtime = showtime;
    this.showtimeDate = showtimeDate;
  }

  onClickPostReview() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.ds.setRecentRoute(this.route);

      this.router.navigate(["/login"]);
    } else {
      this.isOn = true;
    }
  }

  updateShowtime(showtimeId) {
    this.router.navigate(["/moderator-update", showtimeId]);
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  confirm() {
    this.cookievalue = this.cookieService.get("UserDetails");

    if (!this.cookievalue) {
      this.ds.setRecentRoute(this.route);
      this.router.navigate(["/login"]);
    } else {
      if (this.selectedShowId == undefined) {
        this.showErrorAlert("Please select showtime to book your ticket");
        return;
      }
      this.theaterService
        .viewTheaterDetail(this.theatreId)
        .subscribe((theater) => {
          this.theatreName = theater.theatreName;
          if (this.theatreName == "CINEMA LE PALACE SOUSSE") {
            this.router.navigate([
              "/seatselection",
              {
                showId: this.selectedShowId,
                movieId: this.movieId,
                theatreId: this.theatreId,
                showtime: this.showtime,
                showtimeDate: this.showtimeDate,

                date: 1,
              },
            ]);
          } else if (this.theatreName == "LE COLISÉE") {
            this.router.navigate([
              "/seatselection2",
              {
                showId: this.selectedShowId,
                movieId: this.movieId,
                theatreId: this.theatreId,
                showtime: this.showtime,
                showtimeDate: this.showtimeDate,

                date: 1,
              },
            ]);
          } else if (this.theatreName == "CINE JAMIL") {
            this.router.navigate([
              "/seatselection3",
              {
                showId: this.selectedShowId,
                movieId: this.movieId,
                theatreId: this.theatreId,
                showtime: this.showtime,
                showtimeDate: this.showtimeDate,

                date: 1,
              },
            ]);
          } else if (this.theatreName == "CINÉMA LE PALACE TUNIS") {
            this.router.navigate([
              "/seatselection4",
              {
                showId: this.selectedShowId,
                movieId: this.movieId,
                theatreId: this.theatreId,
                showtime: this.showtime,
                showtimeDate: this.showtimeDate,

                date: 1,
              },
            ]);
          }
        });
    }
  }

  changevalue() {
    this.isOn = false;

    location.reload();
  }

  addShowTime() {
    this.router.navigate(["moderator", this.movieId]);
  }

  deleteShowTime(id) {
    this.showTimeService.delete_Showtime(id).subscribe(
      (data) => {
        console.log(data);
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
