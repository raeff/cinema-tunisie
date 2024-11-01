import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { movie, movieList } from "./../Models/movie";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class MovieService {
  resource: string;
  resource2: string;
  resourceURL: string;
  resourceURL2: string;
  idMovie: String;

  constructor(private http: HttpClient) {
    this.resource = "movies";
    this.resource2 = "movies-theatre";
    this.resourceURL = `${environment.serverBaseURL}${this.resource}`;
    this.resourceURL2 = `${environment.serverBaseURL}${this.resource2}`;
  }

  getMoviesTheatre(theatreId: string): Observable<Array<movie>> {
    console.log(`${this.resourceURL2}/${theatreId}`);
    return this.http.get<Array<movie>>(`${this.resourceURL2}/${theatreId}`);
  }
  //this is to get the movies
  get_Movies(): Observable<Array<movie>> {
    return this.http.get<Array<movie>>(this.resourceURL);
  }
  //get single movie
  get_single_Movie(movieId: string): Observable<movie> {
    this.idMovie = movieId;
    console.log(`${this.resourceURL}/${this.idMovie}`);
    console.log(`${this.resourceURL}/${this.idMovie}`);
    return this.http.get<movie>(`${this.resourceURL}/${this.idMovie}`);
  }
  delete_Movie(movieId: string): Observable<movie> {
    this.idMovie = movieId;
    return this.http.delete<movie>(`${this.resourceURL}/${this.idMovie}`);
  }

  update_Movie(movieId, data): Observable<movie> {
    return this.http.put<movie>(`${this.resourceURL}/${movieId}`, data);
  }
}
