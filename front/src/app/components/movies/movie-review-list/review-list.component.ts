import { Component, OnInit } from "@angular/core";
import { Review_Service } from "../../../Services/review.service";
import { MovieService } from "../../../Services/movie.service";
import { Observable } from "rxjs";
import { review } from "../../../Models/review";
import { CookieService } from "ngx-cookie-service";
import { User } from "../../../Models/user";

@Component({
  selector: "app-review-list",
  templateUrl: "./review-list.component.html",
  styleUrls: ["./review-list.component.scss"],
})
export class ReviewListComponent implements OnInit {
  film = { feedback: 0 };

  list: Array<review>;
  list2: Array<review>;
  review: review;
  user: User;
  reviewId: string;
  movieId: String;
  ratemoy;
  ratedelet;
  movieNames = [];

  constructor(
    private reviewService: Review_Service,
    private cookieService: CookieService,
    public movieservice: MovieService
  ) {
    this.getReviewList();
  }

  ngOnInit() {}

  getReviewList() {
    this.user = JSON.parse(this.cookieService.get("UserDetails")).user;
    let reviews$: Observable<Array<review>> =
      this.reviewService.getReviewsForUser(this.user._id);
    reviews$.subscribe((reviews) => {
      this.list = reviews;
      for (var i = 0; i < this.list.length; i++) {
        var id = this.list[i].movieid;
        this.movieservice.get_single_Movie(id).subscribe((movie) => {
          this.movieNames.push(movie.movieName);
        });
      }
      console.log(this.list);
    });
  }

  getReviewListMovie(id) {
    let reviews$: Observable<Array<review>> =
      this.reviewService.getReviewsForMovie(id);
    reviews$.subscribe((reviews) => {
      this.list2 = reviews;
      console.log(this.list2);
      var s = 0;
      for (var i = 0; i < this.list2.length; i++) {
        s = s + this.list2[i].rating;
      }
      s = s - this.ratedelet;
      this.ratemoy = s / (this.list2.length - 1);
      this.film.feedback = this.ratemoy;
      this.movieservice.update_Movie(id, this.film).subscribe((response) => {
        console.log(response);
      });
    });
  }
  getReview(i) {
    this.ratedelet = this.list[i].rating;
    this.movieId = this.list[i].movieid;
    this.getReviewListMovie(this.movieId);
  }

  deleteReview(reviewId) {
    this.reviewService.deleteReview(reviewId).subscribe((reviews) => {
      this.getReviewList();
    });
  }
}
