// @ts-nocheck

import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { review, review_List } from "../../../Models/review";
import { Review_Service } from "../../../Services/review.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { MovieService } from "../../../Services/movie.service";
import { movie } from "../../../Models/movie";
import { ConfirmationDialogComponent } from "../../../shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
declare var require: any;

require("@tensorflow/tfjs");
const toxicity = require("@tensorflow-models/toxicity");

@Component({
  selector: "app-movie-review",
  templateUrl: "./movie-review.component.html",
  styleUrls: ["./movie-review.component.scss"],
})
export class MovieReviewComponent implements OnInit {
  cookievalue = "unknown";
  userContent = false;

  film = { feedback: 0 };

  one = 1;

  two = 2;

  three = 3;

  four = 4;

  five = 5;

  ratemoy = 0;
  movie: movie;
  list: Array<review>;
  reviewService: Review_Service;
  model: any = {};
  //using input/output to pass the data to child component to parent component and vice versa
  @Input() parentData: string;
  @Input() movieId: string;
  @Output() add_invoked = new EventEmitter();
  constructor(
    private router: Router,
    public dialog: MatDialog,
    reviewService: Review_Service,
    private cookieService: CookieService,
    public movieservice: MovieService
  ) {
    this.reviewService = reviewService;
  }

  /**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   */

  /**
 prediction = async () => {

 


 

  document.querySelector('#classify-new')
      .addEventListener('submit', (e) => {
        let text = document.querySelector<HTMLTextAreaElement>('#classify-new-text-input').value;
 

        const threshold = 0.9;
         let predicted:boolean =true
        // Load the model. Users optionally pass in a threshold and an array of
        // labels to include.
        toxicity.load(threshold).then(model => {
          const sentences = [text];

          model.classify(sentences).then(predictions => {
            console.log(predictions);
            // `predictions` is an array of objects, one for each prediction head,
            // that contains the raw probabilities for each input along with the
            // final prediction in `match` (either `true` or `false`).
            // If neither prediction exceeds the threshold, `match` is `null`.
          for(var i=0;i<predictions.length;i++)
          {
          if ((predictions[i].results[0].match)!=false)
          {predicted=false
            
           this.openDialog()
          break;
          }
        }
        if(predicted==true)
        {
          this.onClickAddReview()
        }
       



         
          });
        });




        // Prevent submitting the form which would cause a page reload.
        e.preventDefault();
      });
};

*/

  predict = async () => {
    if (this.userContent) {
      this.onClickAddReview();
    } else if (!this.cookievalue) {
      this.router.navigate(["login"]);
    }
  };
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Please whrite the comments carefully!",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Yes clicked");
        // DO SOMETHING
      }
    });
  }
  onClickAddReview() {
    console.log();
    // this.add_invoked.emit();
    //passing the userid to the customer review component
    this.model.userid = JSON.parse(
      this.cookieService.get("UserDetails")
    ).user._id;
    this.model.movieid = this.movieId;
    let newreview$: Observable<review_List> = this.reviewService.create_Review(
      this.model
    );
    newreview$.subscribe(
      (success) => {
        this.add_invoked.emit();

        this.getReviewList();
      },
      (error) => {
        this.openDialog()
      }
    );
  }

  getReviewList() {
    let reviews$: Observable<Array<review>> =
      this.reviewService.getReviewsForMovie(this.movieId);
    reviews$.subscribe((reviews) => {
      this.list = reviews;
      var s = 0;
      for (var i = 0; i < this.list.length; i++) {
        s = s + this.list[i].rating;
      }

      this.ratemoy = s / this.list.length;
      console.log(this.ratemoy);
      this.film.feedback = this.ratemoy;

      let movies$: Observable<movie> = this.movieservice.update_Movie(
        this.movieId,
        this.film
      );
      movies$.subscribe(() => {
        this.movieservice
          .get_single_Movie(this.movieId)
          .subscribe((response) => {
            console.log(response);
          });
      });
    });
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.cookievalue = null;
    } else if (JSON.parse(this.cookievalue).user.role == "user") {
      this.userContent = true;
    }
  }
}
