






import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { movie } from "../../../Models/movie";
import { RedactorService } from "../../../Services/redactor.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

import { Movie } from "../../../Models/movie-request";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-movie-add",
  templateUrl: "./movie-add.component.html",
  styleUrls: ["./movie-add.component.scss"],
})
export class MovieAddComponent implements OnInit {
  title = "fileUpload";
  image;

  postMovieFailed = false;

  public movieForm: FormGroup;
  public nextmovieForm: FormGroup;

  cookievalue = "unknown";

  adminRedact: string;
  request: Movie = new Movie();

  submitted = false;

  constructor(
    private cookieService: CookieService,
    private redactorService: RedactorService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.movieForm = new FormGroup({
      movieName: new FormControl(null, Validators.required),
      movieImage: new FormControl(null, Validators.required),
      movieURL: new FormControl(null, Validators.required),
      movieReleaseDate: new FormControl(null, Validators.required),
      movieLength: new FormControl(null, Validators.required),
      directorName: new FormControl(null, Validators.required),
      language: new FormControl(null, Validators.required),
      movieType: new FormControl(null, Validators.required),
      synopsis: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
    });

    this.nextmovieForm = new FormGroup({
      movieImage: new FormControl(null, Validators.required),
    });


    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.adminRedact = null;
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
  get f() {
    return this.movieForm.controls;
  }
  /*Get all the sign up controls*/

  /*Sign up button action. Check validations and call signup api*/
  addMovie(): void {
    this.submitted = true;

    if (this.movieForm.invalid) {
      this.postMovieFailed = true;
      setTimeout(()=>{                           //<<<---using ()=> syntax
        this.postMovieFailed = false;
   }, 3000);
      
    }

    this.request.movieName = this.movieForm.get("movieName").value;
    this.request.movieImage = this.movieForm.get("movieImage").value;
    this.request.movieURL = this.movieForm.get("movieURL").value;
    this.request.movieReleaseDate = this.movieForm.get("movieReleaseDate").value;
    this.request.movieLength = this.movieForm.get("movieLength").value;
    this.request.directorName = this.movieForm.get("directorName").value;
    this.request.language = this.movieForm.get("language").value;
    this.request.movieType = this.movieForm.get("movieType").value;
    this.request.synopsis = this.movieForm.get("synopsis").value;
    this.request.rating = this.movieForm.get("rating").value;
    this.request.orders = 0;

    this.redactorService.addmovie(this.request).subscribe(
      (response) => {
        this.onSubmit();

        console.log(response);

        this.router.navigate(["/all-movies"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;

      this.movieForm.controls["movieImage"].setValue(this.image.name);
    }
  }


 

  onSubmit() {
    const formData = new FormData();
    formData.append("file", this.image);

    this.http.post<any>("http://localhost:3000/file", formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
