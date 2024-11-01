import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { modelGroupProvider } from "@angular/forms/src/directives/ng_model_group";
import { DOCUMENT } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { order } from "../../../../Models/order";
import { Order_Service } from "../../../../Services/order.service";
import { CookieService } from "ngx-cookie-service";
import { paymentUrl } from "../../../../Models/paymentUrl";
import { DataService } from "../../../../Services/data.service";
import { TheaterService } from "../../../../Services/theater.service";
import { theater } from "../../../../Models/theater";
import { indexOf } from "underscore";

@Component({
  selector: "app-seat-selection4",
  templateUrl: "./seat-selection4.component.html",
  styleUrls: ["./seat-selection4.component.scss"],
})
export class SeatSelection4Component implements OnInit {
  ab: String;
  public seats = [];
  model: any = {};
  bookedseats: string;
  list: Array<order>;
  movieId: string;
  theatreId: string;
  showId: string;
  showtime: string;
  date: string;
  showtimedate: string;

  cookievalue: string = "unknown";
  amount: Number;
  pUrl: paymentUrl = new paymentUrl();

  theatre: theater;

  palacesousse: boolean = false;
  palacetunis: boolean = false;
  lecolise: boolean = false;
  cinejamil: boolean = false;
  selectionComplited: boolean = false;
  step1: boolean = false;
  step2: boolean = false;

  public listA = [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
    "A16",
    "A17",
  ];
  public listB = [
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "B11",
    "B12",
    "B13",
    "B14",
    "B15",
    "B16",
    "B17",
  ];
  public listC = [
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "C11",
    "C12",
    "C13",
    "C14",
    "C15",
    "C16",
    "C17",
  ];
  public listD = [
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "D10",
    "D11",
    "D12",
    "D13",
    "D14",
    "D15",
    "D16",
    "D17",
  ];
  public listE = [
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "E7",
    "E8",
    "E9",
    "E10",
    "E11",
    "E12",
    "E13",
    "E14",
    "E15",
    "E16",
    "E17",
  ];
  public listF = [
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "F13",
    "F14",
    "F15",
    "F16",
    "F17",
  ];
  public listG = [
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "G9",
    "G10",
    "G11",
    "G12",
    "G13",
    "G14",
    "G15",
    "G16",
    "G17",
  ];
  public listH = [
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "H8",
    "H9",
    "H10",
    "H11",
    "H12",
    "H13",
    "H14",
    "H15",
    "H16",
    "H17",
  ];
  public listI = [
    "I1",
    "I2",
    "I3",
    "I4",
    "I5",
    "I6",
    "I7",
    "I8",
    "I9",
    "I10",
    "I11",
    "I12",
    "I13",
    "I14",
    "I15",
    "I16",
    "I17",
  ];
  public listJ = [
    "J1",
    "J2",
    "J3",
    "J4",
    "J5",
    "J6",
    "J7",
    "J8",
    "J9",
    "J10",
    "J11",
    "J12",
    "J13",
    "J14",
    "J15",
    "J16",
    "J17",
  ];

  public fullList = [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
    "A16",
    "A17",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "B11",
    "B12",
    "B13",
    "B14",
    "B15",
    "B16",
    "B17",
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "C11",
    "C12",
    "C13",
    "C14",
    "C15",
    "C16",
    "C17",
    "D1",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "D10",
    "D11",
    "D12",
    "D13",
    "D14",
    "D15",
    "D16",
    "D17",
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "E7",
    "E8",
    "E9",
    "E10",
    "E11",
    "E12",
    "E13",
    "E14",
    "E15",
    "E16",
    "E17",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "F13",
    "F14",
    "F15",
    "F16",
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
    "G7",
    "G8",
    "G9",
    "G10",
    "G11",
    "G12",
    "G13",
    "G14",
    "G15",
    "G16",
    "G17",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "H8",
    "H9",
    "H10",
    "H11",
    "H12",
    "H13",
    "H14",
    "H15",
    "H16",
    "H17",
    "I1",
    "I2",
    "I3",
    "I4",
    "I5",
    "I6",
    "I7",
    "I8",
    "I9",
    "I10",
    "I11",
    "I12",
    "I13",
    "I14",
    "I15",
    "I16",
    "I17",
    "J1",
    "J2",
    "J3",
    "J4",
    "J5",
    "J6",
    "J7",
    "J8",
    "J9",
    "J10",
    "J11",
    "J12",
    "J13",
    "J14",
    "J15",
    "J16",
    "J17",
  ];

  public places: Array<boolean> = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  @ViewChild("A5", { read: ElementRef }) tref: ElementRef;
  constructor(
    public router: Router,
    public ac: ActivatedRoute,
    public o_service: Order_Service,
    public cookieservice: CookieService,
    private dataservice: DataService,
    public theaterService: TheaterService
  ) {
    this.showId = this.ac.snapshot.params["showId"];
    this.movieId = this.ac.snapshot.params["movieId"];
    this.theatreId = this.ac.snapshot.params["theatreId"];
    this.showtime = this.ac.snapshot.params["showtime"];
    this.showtimedate = this.ac.snapshot.params["showtimeDate"];

    this.date = this.ac.snapshot.params["date"];
  }

  ngOnInit() {
    let orders$: Observable<Array<order>> = this.o_service.order_booked_seats(
      this.theatreId,
      this.movieId,
      this.showtime,
      this.date
    );

    orders$.subscribe((orders) => {
      this.list = orders;

      this.disableseats();
    });
  }

  addClientSeats(model) {
    if (model.name && model.Numseats) {
      this.step1 = true;
      this.step2 = true;
      console.log(this.model.name);
      console.log(this.model.Numseats);
    }
  }
  //Function for disabling seats
  disableseats() {
    console.log(this.list);
    for (let i = 0; i < this.list.length; i++) {
      this.ab = this.list[i].seatdetails;

      var splitted = this.ab.split(",");

      for (let j = 0; j < splitted.length; j++) {
        console.log(splitted[j]);

        let index = this.fullList.findIndex((x) => x === splitted[j]);
        this.places[index] = true;
      }
    }
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      e.target.checked = false;
    }
  }
  changeselection() {
    location.reload();
  }
  //check if user has entered data
  addchk(data) {
    if (this.seats.includes(data)) {
      this.seats.splice(this.seats.indexOf(data), 1);
      this.amount = Number(this.amount) - Number(20);

      this.model.seats = this.seats.toString();
    } else if (this.seats.length.toString() < this.model.Numseats) {
      this.seats.push(data);
      this.amount = Number(this.amount) + Number(20);

      this.model.seats = this.seats.toString();

      if (this.seats.length == this.model.Numseats) {
        this.step2 = false;
        this.selectionComplited = true;
      }
    }
  }

  //function for payment after seat selection
  confirmandpay() {
    this.cookievalue = this.cookieservice.get("UserDetails");
    console.log(this.cookievalue);
    if (this.cookievalue == "") {
      this.pUrl.showId = this.showId;
      this.pUrl.movieId = this.movieId;
      this.pUrl.theatreId = this.theatreId;
      this.pUrl.seats = this.seats;
      this.pUrl.totalseat = this.seats.length;
      this.pUrl.showtime = this.showtime;
      this.pUrl.showtimedate = this.showtimedate;

      this.pUrl.date = this.date;
      this.dataservice.setpUrl(this.pUrl);

      this.router.navigate(["/login"]);
    } else {
      this.pUrl.showId = this.showId;
      this.pUrl.movieId = this.movieId;
      this.pUrl.theatreId = this.theatreId;
      this.pUrl.seats = this.seats;
      this.pUrl.totalseat = this.seats.length;
      this.pUrl.showtime = this.showtime;
      this.pUrl.showtimedate = this.showtimedate;

      this.pUrl.date = this.date;
      this.dataservice.setpUrl(this.pUrl);
      this.router.navigate(["/payment"]);
    }
  }
  goback() {
    location.reload();
  }
}
