export class order {
  userid: String;
  theaterid: String;
  movieid: string;
  showtime: String;
  seatdetails: String;
  totalamount: Number;
  creationtime: String;
  date: Date;

  qr?: String;

  constructor(
    userid: String,
    theaterid: String,
    movieid: string,
    showtime: String,
    seatdetails: String,
    totalamount: Number,
    creationtime: String,
    date: Date,
    qr?: String
  ) {
    this.userid = userid;
    this.theaterid = theaterid;
    this.movieid = movieid;
    this.showtime = showtime;
    this.seatdetails = seatdetails;
    this.totalamount = totalamount;
    this.creationtime = creationtime;
    this.date = date;

    this.qr = qr;
  }
}
