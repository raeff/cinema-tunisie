import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../Models/post";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ShowFeedbackService {
  orderDbName: string;
  orderDbURL: string;
  constructor(private http: HttpClient) {
    this.orderDbName = "Posts";
    this.orderDbURL = `${environment.serverBaseURL}${this.orderDbName}`;
  }

  get_Posts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(`${this.orderDbURL}`);
  }
}
