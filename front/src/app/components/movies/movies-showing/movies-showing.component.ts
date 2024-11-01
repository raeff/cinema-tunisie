import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { movie } from "../../../Models/movie";
import { MovieService } from "../../../Services/movie.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import * as _ from "underscore";
import { theater } from "../../../Models/theater";
import { TheaterService } from "../../../Services/theater.service";

import { HostListener } from "@angular/core";

import { MovieSingle_Service } from "../../../Services/moviesingle.service";
import { showTime } from "../../../Models/showtime";

import { stringify } from "@angular/core/src/render3/util";

import { User } from "../../../Models/user";

import { Review_Service } from "../../../Services/review.service";
import { review } from "../../../Models/review";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
} from "@ng-bootstrap/ng-bootstrap";

import { DatePipe } from "@angular/common";

import { ShowTimeService } from "../../../Services/showtime.service";
import { DataService } from "../../../Services/data.service";
import { UserProfileService } from "../../../Services/user-profile.service";
@Component({
  selector: "app-movies-showing",
  templateUrl: "./movies-showing.component.html",
  styleUrls: ["./movies-showing.component.scss"],
})
export class MoviesShowingComponent implements OnInit {
  cookievalue = "unknown";
  adminRedact: string;
  loading = true;
  list = [];
  listMovies = [];
  searchTerm: string;
  id: string;
  listTheater: Array<theater>;
  currentTheater: string;
  listMvth = [];
  theaterId: string;

  noMovie = true;
  subloading = false;

  pipe = new DatePipe("en-US");
  today = new Date();
  selectedDate = new Date();
  minDate: NgbDate;
  maxDate: NgbDate;
  weekDates = [];
  list_showtimes: Array<showTime> = [];
  result: any[];

  constructor(
    private ds: DataService,
    private userService: UserProfileService,
    public moviesingle_service: MovieSingle_Service,
    private ac: ActivatedRoute,
    private AcRoute: ActivatedRoute,
    private calendar: NgbCalendar,
    public reviewService: Review_Service,
    public showTimeService: ShowTimeService,
    private activatedroute: ActivatedRoute,
    public theaterService: TheaterService,
    public movieservice: MovieService,
    public router: Router,
    private cookieService: CookieService
  ) {
    let theaters$: Observable<Array<theater>> = theaterService.get_Theaters();
    theaters$.subscribe((theaters) => {
      this.listTheater = theaters;
      this.currentTheater = this.listTheater[0].theatreName;
    });

    this.theaterId = "5cba1386317d8d3c1cd402af";

    this.getTheaterMovies("5cba1386317d8d3c1cd402af");
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.adminRedact = null;
      this.cookievalue = null;
    } else {
      if (
        JSON.parse(this.cookievalue).user.role == "redactor" ||
        JSON.parse(this.cookievalue).user.role == "admin"
      ) {
        this.adminRedact = JSON.parse(this.cookievalue).user.role;
      } else {
        this.adminRedact = null;
      }
    }
  }

  movieClick(movieId) {
    this.router.navigate(["/movie", movieId]);
  }
  addMovie() {
    this.router.navigate(["/redactor"]);
  }
  updateMovie(movieId) {
    this.router.navigate(["/redactor", movieId]);
  }

  getTheaterMovies(theatreId) {
    this.noMovie = true;

    this.listMovies = [];

    let movies$: Observable<Array<movie>> =
      this.movieservice.getMoviesTheatre(theatreId);
    movies$.subscribe((movies) => {
      this.listMvth = movies;
      console.log(this.listMvth);

      this.listMvth = _.sortBy(this.listMvth, "feedback").reverse();
      if (this.listMovies.length > 0) {
        this.noMovie = false;
      }
      this.loading = false;
      this.subloading = false;
    });
  }

  onChange(deviceValue) {
    this.subloading = true;
    this.currentTheater = deviceValue;
    this.listMovies = [];
    if (deviceValue == "LE COLISÉE") {
      this.theaterId = "5cba1386317d8d3c1cd402af";
      this.getTheaterMovies("5cba1386317d8d3c1cd402af");
    }
    if (deviceValue == "CINE JAMIL") {
      this.theaterId = "5cba61a488618f57e8b11a56";

      this.getTheaterMovies("5cba61a488618f57e8b11a56");
    }
    if (deviceValue == "CINÉMA LE PALACE TUNIS") {
      this.theaterId = "5cbfe3c61c9d4400009b95fa";

      this.getTheaterMovies("5cbfe3c61c9d4400009b95fa");
    }
    if (deviceValue == "CINEMA LE PALACE SOUSSE") {
      this.theaterId = "5cbfe4031c9d4400009b95fb";

      this.getTheaterMovies("5cbfe4031c9d4400009b95fb");
    }
  }

  getTheaterdetails(id) {
    console.log(id);
    this.router.navigate(["cinemas", id]);
  }

  deleteMovie(id) {
    this.movieservice.delete_Movie(id).subscribe((response) => {
      console.log(response);
      this.getTheaterMovies(this.listTheater[0]._id);
    });
  }
}
