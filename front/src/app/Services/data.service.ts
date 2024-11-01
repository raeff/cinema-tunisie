import { Injectable } from "@angular/core";
import { paymentUrl } from "../Models/paymentUrl";
import { Router, ActivatedRoute } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class DataService {
  private pUrl: paymentUrl;
  RecentRoute;
  private userId: String;
  private IsSignup: boolean = true;
  public isDisplayname: string = "Login";

  constructor() {}

  // setting property for userid
  setUserId(id: String) {
    this.userId = id;
  }
  getUserRole(id: String) {
    this.userId = id;
  }
  //get for userid
  getUserId() {
    return this.userId;
  }
  //set property
  setpUrl(pUrl: paymentUrl) {
    this.pUrl = pUrl;
  }
  setRecentRoute(route) {
    this.RecentRoute = route;
  }
  getRecentRoute() {
    return this.RecentRoute;
  }
  //get pUrl string
  getpUrl() {
    return this.pUrl;
  }

  //set  display name in header
  setisDisplayname(value: string) {
    this.isDisplayname = value;
  }
  //get  display name in header
  getisDisplayname() {
    return this.isDisplayname;
  }
  //set signup boolean
  setIsSignup(value: boolean) {
    this.IsSignup = value;
  }
  //get  signup
  getIsSignup() {
    return this.IsSignup;
  }
}
