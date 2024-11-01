import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { movie } from "../Models/movie";

@Injectable()
export class RedactorService {
  moviesUrl: string;
  moviesResourceURL: string;

  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
    this.moviesUrl = "movies";
    this.moviesResourceURL = `${environment.serverBaseURL}${this.moviesUrl}`;
  }

  /**
   * Sign up
   *
   * @param  {MovieRequest} movieRequest: SignupRequest {signUpRequest with username, password, email, phoneno, firstname, lastname}
   * @return {Observable<movie>} {Observable for saved user object}
   */
  addmovie(movieRequest: movie): Observable<movie> {
    return this.http.post<movie>(this.moviesResourceURL, movieRequest);
  }
}
