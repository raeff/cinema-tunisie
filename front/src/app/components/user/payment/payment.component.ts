import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";

import { order } from "../../../Models/order";
import { Observable } from "rxjs";
import { DatePipe } from "@angular/common";

import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "../../../Services/movie.service";
import { TheaterService } from "../../../Services/theater.service";
import { DataService } from "../../../Services/data.service";

import { ShowTimeService } from "../../../Services/showtime.service";
import { CookieService } from "ngx-cookie-service";

import { movie } from "../../../Models/movie";
import { theater } from "../../../Models/theater";
import { showTime } from "../../../Models/showtime";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { paymentUrl } from "../../../Models/paymentUrl";

import { Order_Service } from "../../../Services/order.service";
import { ConfirmationDialogComponent } from "../../../shared/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material";
// import { getMaxListeners } from 'cluster';
@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  @ViewChild("screen") screen: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("downloadLink") downloadLink: ElementRef;

  cookievalue = "unknown";
  // orderService: Order_Service;
  theaterService: TheaterService;
  public paymentForm: FormGroup;
  //submitted = false;
  username: string;
  cardnum1: string;
  cardnum2: string;
  cardnum3: string;
  cardnum4: string;
  cvvcode: string;
  model: any = {};
  modelqr: any = {};
  form1: any = {};

  movie: movie;
  theater: theater;
  showtime: string;
  showtimedate: string;
  theatreId: string;

  movieId: string;
  showId: string;
  seatdetails: string;
  noofseats: number;
  totalamt: number;
  ticketprice = 30;
  handlingfees = 7;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  userid: string;
  creationtime: string;
  ccname: string;
  isDownloadEnabled: boolean = false;

  payed: boolean = false;

  submitted: boolean = false;
  @Output() add_pay_invoked = new EventEmitter();

  pUrl: paymentUrl = new paymentUrl();

  elementType: "canvas";
  constructor(
    public dialog: MatDialog,
    public o_service: Order_Service,
    public theaterservice: TheaterService,
    public movieservice: MovieService,
    public orderService: Order_Service,
    public dataservice: DataService,

    private ac: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.pUrl = this.dataservice.getpUrl();
    if (this.pUrl) {
      console.log(this.pUrl);
      this.theatreId = this.pUrl.theatreId;
      this.movieId = this.pUrl.movieId;
      this.showId = this.pUrl.showId;
      this.showtime = this.pUrl.showtime;
      this.showtimedate = this.pUrl.showtimedate;

      this.noofseats = this.pUrl.totalseat;
      this.creationtime = this.pUrl.date;

      this.seatdetails = this.pUrl.seats.toString();
      //debugger;
      this.cookievalue = this.cookieService.get("UserDetails");
      this.email = JSON.parse(this.cookievalue).user.email;

      this.firstname = JSON.parse(this.cookievalue).user.firstname;
      this.lastname = JSON.parse(this.cookievalue).user.lastname;
      this.userid = JSON.parse(this.cookievalue).user._id;
      this.fullname = this.firstname + " " + this.lastname;

      //get theater-detail
      let theater_d$: Observable<theater> = theaterservice.viewTheaterDetail(
        this.theatreId
      );
      theater_d$.subscribe((theater_d) => {
        this.theater = theater_d;
        //   console.log(theater_d);
      });

      //get movie-detail
      let movie_d$: Observable<movie> = movieservice.get_single_Movie(
        this.movieId
      );
      movie_d$.subscribe((movie_d) => {
        //  console.log(movie_d);
        this.movie = movie_d;
      });

      // populating order data -
      this.model.userid = this.userid;
      this.model.theaterid = this.theatreId;
      this.model.movieid = this.movieId;
      this.model.showtime = this.showtime;
      this.model.showtimedate = this.showtimedate;

      this.model.seatdetails = this.seatdetails;
      // calculating the total amount of the order
      this.totalamt = this.noofseats * this.ticketprice + this.handlingfees;
      this.model.totalamount = this.totalamt;
      this.model.creationtime = this.creationtime;
      this.model.email = this.email;
      this.modelqr = this.model;
      this.modelqr.qr = JSON.stringify(this.model);
    } else {
      this.pUrl = null;
    }
  }
  get f() {
    return this.paymentForm.controls;
  }

  ngOnInit() {
    this.paymentForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Zs]+$"),
        Validators.minLength(3),
      ]),
      cardnum1: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      cardnum2: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      cardnum3: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      cardnum4: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      cvvcode: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]*"),
        Validators.minLength(3),
        Validators.maxLength(3),
      ]),
    });

    this.pUrl = this.dataservice.getpUrl();
  }
  goback() {
    this.router.navigate(["movie-single/", this.movieId]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Please enter a valid card number",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Yes clicked");
        // DO SOMETHING
      }
    });
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Order placed successfull and  booking details have been sent to your email.",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Yes clicked");
        // DO SOMETHING
      }
    });
  }
  /*THe below function perform all the input validations and call the 
orderService.createOrder rest api to save the order in the database */
  onClickPlaceOrder() {
    this.submitted = true;

    if (this.paymentForm.invalid) {
      this.openDialog();
      return;
    }

    //console.log(this.model);
    console.log(this.modelqr);
    let neworder$: Observable<order> = this.orderService.createOrder(
      this.modelqr
    );
    neworder$.subscribe(
      (success) => {
        this.openDialog2();
        this.isDownloadEnabled = true;
        this.payed = true;
        this.o_service.viewMovieOrders(this.movieId).subscribe((orders) => {
          var s = 0;
          for (var j = 0; j < orders.length; j++) {
            var ab = orders[j].seatdetails;
            var splitted = ab.split(",");
            s += splitted.length;
          }
          this.movie.orders = s;
          this.movieservice
            .update_Movie(this.movieId, this.movie)
            .subscribe((movie) => {
              console.log(movie);
            });
        });
      },
      (error) => {
        console.log(error);
      }
    );
    this.add_pay_invoked.emit();
  }

  downloadAsPDF() {
    let element = document.querySelector("#capture") as HTMLCanvasElement;
    html2canvas(element).then(function (canvas) {
      // Convert the canvas to blob
      canvas.toBlob(function (blob) {
        // To download directly on browser default 'downloads' location
        let link = document.createElement("a");
        link.download = "image.png";
        link.href = URL.createObjectURL(blob);
        link.click();

        // To save manually somewhere in file explorer

        saveAs(blob, "image.png");
      }, "image/png");
    });
  }
}
