import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { SignupRequest } from "../Models/signup-request";
import { User } from "../Models/user";
import { order } from "../Models/order";
import { UserProfileRequest } from "../Models/user-profile-request";
import { HttpHeaders } from "@angular/common/http";
@Injectable()
export class UserProfileService {
  userUrl: string;
  userResourceURL: string;
  userProfileUrl: string;
  userProfileResourceURL: string;
  idURL: string;
  updateProfileUrl: string;
  updateUserProfileResourceURL: string;

  idUser: string;
  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
    this.userUrl = "user";
    this.userResourceURL = `${environment.serverBaseURL}${this.userUrl}`;
    this.userProfileUrl = "users";
    this.userProfileResourceURL = `${environment.serverBaseURL}${this.userProfileUrl}`;

    this.updateProfileUrl = "user";
    this.updateUserProfileResourceURL = `${environment.serverBaseURL}${this.updateProfileUrl}`;
  }

  /**
   * User profile
   *
   * @param  {_id} string}
   * @return {Observable<User>} {Observable for saved user object}
   */
  getUserDetails(_id: string): Observable<User> {
    this.idURL = `${_id}`;
    return this.http.get<User>(`${this.userProfileUrl}/${this.idURL}`);
  }

  getUser(_id: string): Observable<User> {
    this.idURL = `${_id}`;
    return this.http.get<User>(`${this.userResourceURL}/${this.idURL}`);
  }

  /**
   * User profile
   *
   * @param  {UserProfileRequest} userProfileRequest: UserProfileRequest {userProfileRequest with email, phoneno}
   * @return {Observable<User>} {Observable for saved user object}
   */
  get_Users(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.userProfileResourceURL);
  }

  updateUser(userId, data): Observable<User> {
    return this.http.put<User>(
      `${this.userProfileResourceURL}/${userId}`,
      data
    );
  }
  updateUserDetails(
    userProfileRequest: UserProfileRequest,
    token: string
  ): Observable<User> {
    let httpHeaders = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.http.put<User>(
      this.updateUserProfileResourceURL,
      userProfileRequest,
      {
        headers: httpHeaders,
      }
    );
  }

  delete_user(userId: string): Observable<User> {
    this.idUser = userId;
    return this.http.delete<User>(`${this.userResourceURL}/${this.idUser}`);
  }
}
