import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserProfileService } from "../../../Services/user-profile.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { order } from "../../../Models/order";
import { Order_Service } from "../../../Services/order.service";

import { MovieService } from "../../../Services/movie.service";

import * as _ from "underscore";
@Component({
  selector: "app-users-tickets",
  templateUrl: "./users-tickets.component.html",
  styleUrls: ["./users-tickets.component.scss"],
})
export class UsersTicketsComponent implements OnInit {
  cookievalue = "unknown";
  adminContent: string;
  userId: string;

  list: Array<order>;
  model;
  showtime: string;
  theatername: string;
  moviename: string;
  seatdetails: string;
  totalamount: string;
  bookingtime: string;
  order_d: order;
  order: order;

  orderId: string;
  constructor(
    public movieService: MovieService,
    public o_service: Order_Service,
    private activatedroute: ActivatedRoute,
    public userservice: UserProfileService,
    public router: Router,
    private cookieService: CookieService
  ) {
    this.userId = this.activatedroute.snapshot.params["userId"];
    console.log(this.userId);
    let orders$: Observable<Array<order>> = o_service.viewUserOrders(
      this.userId
    );
    orders$.subscribe((orders) => {
      this.list = orders;
      console.log(this.list);
    });
  }

  ngOnInit() {
    this.cookievalue = this.cookieService.get("UserDetails");
    if (JSON.parse(this.cookievalue).user.role == "admin") {
      this.adminContent = JSON.parse(this.cookievalue).user.role;
    } else {
      this.adminContent = null;
    }
  }

  onClickDetail(orderd) {
    this.showtime = orderd.showtime;
    this.moviename = orderd.movieRef.movieName;
    this.theatername = orderd.theaterRef.theatreName;
    this.seatdetails = orderd.seatdetails;
    this.totalamount = orderd.totalamount;
    this.bookingtime = orderd.creationtime;
  }

  getUserOrders() {
    let orders$: Observable<Array<order>> = this.o_service.viewUserOrders(
      this.userId
    );
    orders$.subscribe((orders) => {
      this.list = orders;
    });
  }

  delete(orderId) {
    console.log(orderId);
    let orders$: Observable<order> = this.o_service.get_Order(orderId);
    orders$.subscribe((orders) => {
      this.order = orders;
      var ab = this.order.seatdetails;

      var splitted = ab.split(",");
      var o = splitted.length;
      this.movieService
        .get_single_Movie(this.order.movieid)
        .subscribe((movie) => {
          movie.orders = movie.orders - o;
          this.movieService
            .update_Movie(this.order.movieid, movie)
            .subscribe(() => {
              this.o_service.delete_order(orderId).subscribe((response) => {
                console.log(response);
                this.getUserOrders();
              });
            });
        });
      console.log(this.order);
    });
  }
}
