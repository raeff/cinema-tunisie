import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../models/post";

@Injectable({
  providedIn: "root",
})
export class AddFeedbackService {
  constructor(private http: HttpClient) {}

  addPost(post: Post) {
    return this.http.post("http://localhost:3000/createPost", {
      userid: post.userid,
      description: post.description,
      date: post.date,
    });
  }
}
