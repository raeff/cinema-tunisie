import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { showTime } from "../Models/showtime";

@Injectable({
  providedIn: "root",
})
export class ModeratorService {
  showTimeUrl: string;
  showTimeUrlResourceURL: string;

  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
    this.showTimeUrl = "showtime";
    this.showTimeUrlResourceURL = `${environment.serverBaseURL}${this.showTimeUrl}`;
  }

  /**
   * Sign up
   *
   * @param  {MovieRequest} movieRequest: SignupRequest {signUpRequest with username, password, email, phoneno, firstname, lastname}
   * @return {Observable<movie>} {Observable for saved user object}
   */
  addshowTime(showTimeRequest: showTime): Observable<showTime> {
    return this.http.post<showTime>(
      this.showTimeUrlResourceURL,
      showTimeRequest
    );
  }
}
