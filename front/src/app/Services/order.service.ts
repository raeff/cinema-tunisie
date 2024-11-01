import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { order } from "./../Models/order";
import { Guest } from "./../Models/qr";

import { environment } from "./../../environments/environment";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class Order_Service {
  private guestSource = new BehaviorSubject<Guest[]>(null);
  guests$ = this.guestSource.asObservable();
  private guests = [
    {
      id: "7558e6e5-3cfa-4c24-b5b7-653ecbd49925",
      firstName: "Pato",
      lastName: "Vargas",
    },
    {
      id: "4847498c-b57f-4ceb-8c0c-8831b9972158",
      firstName: "Diego",
      lastName: "Maradona",
    },
  ];

  theaterorderDbName: string;
  theaterorderDbURL: string;

  movieorderDbName: string;
  movieorderDbURL: string;

  userorderDbURL: string;
  userorderDbName: string;
  orderDbName: string;
  orderDbURL: string;
  idURL: string;
  idOrder: string;
  orderId: string;
  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {
    this.populateQR();
    this.guestSource.next(this.guests);

    this.userorderDbName = "user-orders";
    this.userorderDbURL = `${environment.serverBaseURL}${this.userorderDbName}`;

    this.movieorderDbName = "movie-orders";
    this.movieorderDbURL = `${environment.serverBaseURL}${this.movieorderDbName}`;

    this.orderDbName = "orders";
    this.orderDbURL = `${environment.serverBaseURL}${this.orderDbName}`;

    this.theaterorderDbName = "theater-orders";
    this.theaterorderDbURL = `${environment.serverBaseURL}${this.theaterorderDbName}`;
  }

  //getting user specific orders
  viewUserOrders(_id: string): Observable<Array<order>> {
    this.idURL = `${_id}`;
    return this.http.get<Array<order>>(`${this.userorderDbURL}/${this.idURL}`);
  }

  viewMovieOrders(_id: string): Observable<Array<order>> {
    this.idURL = `${_id}`;
    return this.http.get<Array<order>>(`${this.movieorderDbURL}/${this.idURL}`);
  }
  get_Orders(): Observable<Array<order>> {
    return this.http.get<Array<order>>(`${this.orderDbURL}`);
  }

  get_Order(orderId: string): Observable<order> {
    this.idOrder = orderId;

    return this.http.get<order>(`${this.orderDbURL}/${this.idOrder}`);
  }
  /**
   * Creates new order.
   *
   * @param  {order order: order_list {new order_list object}
   * @return {Observable<order>} {Observable for saved order object}
   */
  createOrder(order: order): Observable<order> {
    let neworder: order;
    neworder = order;

    return this.http.post<order>(
      `${environment.serverBaseURL}${this.orderDbName}`,
      neworder
    );
  }
  update_Order(orderId, data): Observable<order> {
    this.idOrder = orderId;
    return this.http.put<order>(`${this.orderDbURL}/${this.idOrder}`, data);
  }

  delete_order(orderId: string): Observable<order> {
    this.idOrder = orderId;
    return this.http.delete<order>(`${this.orderDbURL}/${this.idOrder}`);
  }

  //Added by Dharati on 4/21/2019

  order_booked_seats(
    theatreId: string,
    movieId: string,
    showtime: string,
    date: String
  ): Observable<Array<order>> {
    // console.log(`${this.orderDbURL}/${theatreId}/${movieId}/${showtime}/${date}`);
    return this.http.get<Array<order>>(
      `${this.orderDbURL}/${theatreId}/${movieId}/${showtime}/${date}`
    );
  }

  order_theater(theatreId: string): Observable<Array<order>> {
    // console.log(`${this.orderDbURL}/${theatreId}/${movieId}/${showtime}/${date}`);
    return this.http.get<Array<order>>(
      `${this.theaterorderDbURL}/${theatreId}`
    );
  }

  populateQR(): void {
    this.guests.forEach((g: Guest) => (g.qr = JSON.stringify({ ...g })));
  }
}
