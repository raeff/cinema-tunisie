import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { showTime } from "./../Models/showtime";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ShowTimeService {
  showtimeDbName: string;
  showtimesDbName: string;

  showtimeDbURL: string;

  showtimesDbURL: string;

  idURL: string;
  idShowtime: String;

  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
    this.showtimeDbName = "showtimes";
    this.showtimesDbName = "showtime";

    this.showtimeDbURL = `${environment.serverBaseURL}${this.showtimeDbName}`;
    this.showtimesDbURL = `${environment.serverBaseURL}${this.showtimesDbName}`;
  }

  viewTheaterDetail(_id: string): Observable<showTime> {
    this.idURL = `${_id}`;
    return this.http.get<showTime>(`${this.showtimeDbURL}/${this.idURL}`);
  }

  delete_Showtime(showtimeId): Observable<any> {
    return this.http.delete(`${this.showtimeDbURL}/st/${showtimeId}`);
  }

  get_Showtime(showtimeId: string): Observable<showTime> {
    this.idShowtime = showtimeId;

    return this.http.get<showTime>(
      `${this.showtimeDbURL}/st/${this.idShowtime}`
    );
  }

  get_Showtimes(): Observable<Array<showTime>> {
    return this.http.get<Array<showTime>>(this.showtimesDbURL);
  }

  update_Showtime(shwotimeId, data): Observable<showTime> {
    return this.http.put<showTime>(`${this.showtimeDbURL}/${shwotimeId}`, data);
  }
}
