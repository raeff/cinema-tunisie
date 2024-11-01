import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormsModule, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { CookieService } from "ngx-cookie-service";
import { ShowTimeService } from "../../../Services/showtime.service";
import { showTime } from "../../../Models/showtime";
import { ActivatedRoute, Router } from "@angular/router";

import { theater } from "../../../Models/theater";
import { TheaterService } from "../../../Services/theater.service";
import { HttpClient } from "@angular/common/http";
import { movie } from "../../../Models/movie";
import { MovieService } from "../../../Services/movie.service";
@Component({
  selector: "app-update-showtime",
  templateUrl: "./update-showtime.component.html",
  styleUrls: ["./update-showtime.component.scss"],
})
export class UpdateShowtimeComponent implements OnInit {
  public showtimeForm: FormGroup;
  cookievalue = "unknown";
  adminMod: string;
  images;
  list: Array<theater>;
  showtimeId: string;
  showtime: showTime;
  movie: movie;

  constructor(
    private movieService: MovieService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public theaterService: TheaterService,
    public router: Router,
    private cookieService: CookieService,
    public showtimeservice: ShowTimeService
  ) {
    let theaters$: Observable<Array<theater>> = theaterService.get_Theaters();
    theaters$.subscribe((theaters) => {
      this.list = theaters;
    });

    this.showtimeForm = this.fb.group({
      movieId: "",
      theatreId: "",
      showTime: "",
      date: "",
    });
    this.showtimeId = this.activatedRoute.snapshot.params["showtimeId"];

    this.showtimeservice.get_Showtime(this.showtimeId).subscribe(
      (data) => {
        console.log(data);
        this.showtime = data;

        let movie$: Observable<movie> = this.movieService.get_single_Movie(
          this.showtime.movieId
        );
        movie$.subscribe((movie) => {
          this.movie = movie;
        });
        this.showtimeForm.controls["movieId"].setValue(this.showtime.movieId);
        this.showtimeForm.controls["theatreId"].setValue(
          this.showtime.theatreId
        );
        this.showtimeForm.controls["showTime"].setValue(this.showtime.showTime);
        this.showtimeForm.controls["date"].setValue(this.showtime.date);
      },
      (error) => console.log(error)
    );
    // Set Values
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.adminMod = null;
    } else {
      if (
        JSON.parse(this.cookievalue).user.role == "moderator" ||
        JSON.parse(this.cookievalue).user.role == "admin"
      ) {
        this.adminMod = JSON.parse(this.cookievalue).user.role;
      } else {
        this.adminMod = null;
      }
    }

    this.showtimeId = this.activatedRoute.snapshot.params["showtimeId"];

    this.showtimeservice.get_Showtime(this.showtimeId).subscribe(
      (data) => {
        console.log(data);
        this.showtime = data;
      },
      (error) => console.log(error)
    );
  }

  updateShowtime() {
    this.showtime = this.showtimeForm.value;

    let showtimes$: Observable<showTime> = this.showtimeservice.update_Showtime(
      this.showtimeId,
      this.showtime
    );
    showtimes$.subscribe(() => {
      this.router.navigate(["/movie-single/" + this.showtime.movieId]);
    });
  }
}
