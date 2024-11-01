import { Component, OnInit } from "@angular/core";
import { order } from "../../../Models/order";
import { Order_Service } from "../../../Services/order.service";
import { Observable } from "rxjs";

import { CookieService } from "ngx-cookie-service";
import { MovieService } from "../../../Services/movie.service";
import { movie } from "../../../Models/movie";
import * as _ from "underscore";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.component.html",
  styleUrls: ["./stats.component.scss"],
})
export class StatsComponent implements OnInit {
  public chartData: Object[];
  public primaryXAxis: Object;

  s1 = 0;
  s2 = 0;
  s3 = 0;
  s4 = 0;

  orderPalacesousse: Array<order>;
  orderPalacetunis: Array<order>;

  orderCinejamil: Array<order>;

  orderColise: Array<order>;

  model;
  showtime: string;
  theatername: string;
  moviename: string;
  seatdetails: string;
  totalamount: string;
  bookingtime: string;
  order_d: order;
  cookievalue = "unknown";
  userid: string;
  movieid: string;
  adminContent: string;
  listMovies;
  list = [];
  tickets: Array<number> = [];
  orderIndex = [];
  movieIndex = [];

  constructor(
    public movieservice: MovieService,
    public o_service: Order_Service,
    private cookieService: CookieService
  ) {}
  tri(orders) {
    for (var i = 0; i < orders.length; i++) {
      var PMAX = i;
      for (var j = i + 1; j < orders.length; j++)
        if (orders[j] > orders[PMAX]) PMAX = j;
      /* Echange de A[I] avec le maximum */
      var AIDE = orders[i];
      orders[i] = orders[PMAX];
      orders[PMAX] = AIDE;
    }
    console.log(orders);
  }
  ngOnInit(): void {
    let movies$: Observable<Array<movie>> = this.movieservice.get_Movies();
    movies$.subscribe((movies) => {
      this.listMovies = movies;

      this.listMovies = _.sortBy(this.listMovies, "orders").reverse();

      for (var i = 0; i < 5; i++) {
        this.list.push(this.listMovies[i]);
      }
      console.log(this.list);

      this.primaryXAxis = { valueType: "Category" };

      let orders$: Observable<Array<order>> = this.o_service.order_theater(
        "5cba1386317d8d3c1cd402af"
      );
      orders$.subscribe((orders) => {
        this.orderColise = orders;

        for (var i = 0; i < this.orderColise.length; i++) {
          var ab = this.orderColise[i].seatdetails;
          var splitted = ab.split(",");
          this.s1 = this.s1 + splitted.length;
        }

        let orders2$: Observable<Array<order>> = this.o_service.order_theater(
          "5cba61a488618f57e8b11a56"
        );
        orders2$.subscribe((orders) => {
          this.orderCinejamil = orders;

          for (var i = 0; i < this.orderCinejamil.length; i++) {
            var ab = this.orderCinejamil[i].seatdetails;
            var splitted = ab.split(",");
            this.s2 = this.s2 + splitted.length;
          }

          let orders3$: Observable<Array<order>> = this.o_service.order_theater(
            "5cbfe3c61c9d4400009b95fa"
          );
          orders3$.subscribe((orders) => {
            this.orderPalacetunis = orders;

            for (var i = 0; i < this.orderPalacetunis.length; i++) {
              var ab = this.orderPalacetunis[i].seatdetails;
              var splitted = ab.split(",");
              this.s3 = this.s3 + splitted.length;
            }

            let orders4$: Observable<Array<order>> =
              this.o_service.order_theater("5cbfe4031c9d4400009b95fb");
            orders4$.subscribe((orders) => {
              this.orderPalacesousse = orders;

              for (var i = 0; i < this.orderPalacesousse.length; i++) {
                var ab = this.orderPalacesousse[i].seatdetails;
                var splitted = ab.split(",");
                this.s4 = this.s4 + splitted.length;
              }
              this.chartData = [
                { cinema: "palace sousse", order: this.s1 },
                { cinema: "palace tunis", order: this.s2 },
                { cinema: "le colise", order: this.s3 },
                { cinema: "cinejamil", order: this.s4 },
              ];
            });
          });
        });
      });
    });

    this.cookievalue = this.cookieService.get("UserDetails");
    if (!this.cookievalue) {
      this.adminContent = null;
    } else {
      if (JSON.parse(this.cookievalue).user.role == "admin") {
        this.adminContent = JSON.parse(this.cookievalue).user.role;
      } else {
        this.adminContent = null;
      }
    }

    // Data for chart series
  }
}
