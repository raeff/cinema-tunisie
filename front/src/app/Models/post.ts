export class Post {
  userid: String;
  description: String;
  date: Date;

  constructor(userid: String, description: String, date: Date) {
    this.userid = userid;
    this.description = description;
    this.date = date;
  }
}
