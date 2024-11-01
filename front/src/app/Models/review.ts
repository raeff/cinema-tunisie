export class review {
  _id: string;
  userid: string;
  mname: string;
  desc: string;
  date: Date;
  movieid: string;
  rating: number;

  constructor(
    _id: string,
    userid: string,
    mname: string,
    desc: string,
    date: Date,
    movieid: string,
    rating: number
  ) {
    this._id = _id;
    this.userid = userid;
    this.mname = mname;
    this.desc = desc;
    this.date = date;
    this.movieid = movieid;
    this.rating = rating;
  }
}

export class review_List {
  userid: string;
  mname: string;
  desc: string;
  date: Date;
  movieid: string;
  rating: number;

  constructor(
    userid: string,
    mname: string,
    desc: string,
    date: Date,
    movieid: string,
    rating: number
  ) {
    this.userid = userid;

    this.desc = desc;
    this.date = date;
    this.movieid = movieid;
    this.rating = rating;
  }
}
