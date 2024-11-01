import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { movie } from "../../../Models/movie";
import { MovieService } from "../../../Services/movie.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import * as _ from "underscore";
@Component({
  selector: "app-all-movies",
  templateUrl: "./all-movies.component.html",
  styleUrls: ["./all-movies.component.scss"],
})
export class AllMoviesComponent implements OnInit {
  cookievalue = "unknown";
  adminRedact = false;
  admin = false;
  adminMod = false;

  list: Array<movie>;
  searchTerm: string;
  id: string;
  constructor(
    private activatedroute: ActivatedRoute,
    public movieservice: MovieService,
    public router: Router,
    private cookieService: CookieService
  ) {
    let movies$: Observable<Array<movie>> = movieservice.get_Movies();
    movies$.subscribe((movies) => {
      this.list = movies;
      this.list = _.sortBy(this.list, "feedback").reverse();
      console.log(this.list);
    });
  }
  get_AllMovies() {
    let movies$: Observable<Array<movie>> = this.movieservice.get_Movies();
    movies$.subscribe((movies) => {
      this.list = movies;
      this.list = _.sortBy(this.list, "feedback").reverse();
    });
  }
  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.adminRedact = null;
      this.cookievalue = null;
    } else {
      if (
        JSON.parse(this.cookievalue).user.role == "admin" ||
        JSON.parse(this.cookievalue).user.role == "moderator" ||
        JSON.parse(this.cookievalue).user.role == "redactor"
      ) {
        this.admin = JSON.parse(this.cookievalue).user.role;
      }
      if (
        JSON.parse(this.cookievalue).user.role == "redactor" ||
        JSON.parse(this.cookievalue).user.role == "admin"
      ) {
        this.adminRedact = JSON.parse(this.cookievalue).user.role;
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
  deleteMovie(id) {
    this.movieservice.delete_Movie(id).subscribe((response) => {
      console.log(response);
      alert("movie removed succefully");
      this.get_AllMovies();
    });
  }
}
