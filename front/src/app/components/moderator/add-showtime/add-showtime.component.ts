import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { showTime } from "../../../Models/showtime";
import { ModeratorService } from "../../../Services/moderator.service";
import { Router, ActivatedRoute } from "@angular/router";

import { theater } from "../../../Models/theater";
import { TheaterService } from "../../../Services/theater.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { MovieService } from "../../../Services/movie.service";
import { movie } from "../../../Models/movie";

@Component({
  selector: "app-add-showtime",
  templateUrl: "./add-showtime.component.html",
  styleUrls: ["./add-showtime.component.scss"],
})
export class AddShowtimeComponent implements OnInit {
  cookievalue = "unknown";
  adminMod: string;
  list: Array<theater>;
  movie: movie;
  request: showTime;
  submitted = false;
  showtimeForm = {
    movieId: "",
    theatreId: "",
    showTime: "",
    date: new Date(),
  };
  selectedTheater;
  id = null;
  constructor(
    private movieService: MovieService,
    private cookieService: CookieService,
    private moderatorService: ModeratorService,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private theaterService: TheaterService
  ) {
    this.id = this.activatedRoute.snapshot.params["id"];
    let theater$: Observable<Array<theater>> =
      this.theaterService.get_Theaters();
    theater$.subscribe((theater) => {
      this.list = theater;
    });

    let movie$: Observable<movie> = this.movieService.get_single_Movie(this.id);
    movie$.subscribe((movie) => {
      this.movie = movie;
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

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
  }

  /*Get all the sign up controls*/
  onSelectionChange(entry) {
    this.selectedTheater = entry;
  }

  /*Sign up button action. Check validations and call signup api*/
  addShowTime(): void {
    this.submitted = true;

    const today = new Date();

    this.showtimeForm.movieId = this.id;
    this.showtimeForm.theatreId = this.selectedTheater._id;

    this.request = this.showtimeForm;

    this.moderatorService.addshowTime(this.request).subscribe(
      () => {
        this.movieService.get_single_Movie(this.id).subscribe((movie) => {
          movie.theaterid.push(this.selectedTheater._id);

          this.movieService.update_Movie(this.id, movie).subscribe(() => {
            this.router.navigate(["/movie/" + this.request.movieId]);
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
