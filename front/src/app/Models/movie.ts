export class movie {
  movieName: String;
  movieImage: String;
  movieURL: String;
  movieReleaseDate: String;
  movieLength: String;
  directorName: String;
  language: String;
  movieType: String;
  rating: String;
  synopsis: String;
  feedback: Number;
  theaterid: String[];
  orders: number;

  constructor(
    movieName: String,
    movieImage: String,
    movieURL: String,
    movieReleaseDate: String,
    movieLength: String,
    directorName: String,
    language: String,
    movieType: String,
    synopsis: String,
    rating: String,
    feedback: Number,
    theaterid: String[],
    orders: number
  ) {
    this.movieName = movieName;
    this.movieImage = movieImage;
    this.movieURL = movieURL;
    this.movieReleaseDate = movieReleaseDate;
    this.movieLength = movieLength;
    this.directorName = directorName;
    this.language = language;
    this.movieType = movieType;
    this.synopsis = synopsis;
    this.rating = rating;

    this.feedback = feedback;
    this.theaterid = theaterid;
    this.orders = orders;
  }
}

export class movieList {
  movieName: String;
  movieImage: String;
  movieURL: String;
  movieReleaseDate: String;
  movieLength: String;
  directorName: String;
  language: String;
  movieType: String;
  synopsis: String;
  rating: String;
  feedback: Number;
  theaterid: String[];

  constructor(
    movieName: String,
    movieImage: String,
    movieURL: String,
    movieReleaseDate: String,
    movieLength: String,
    directorName: String,
    language: String,
    movieType: String,
    synopsis: String,
    rating: String,
    feedback: Number,
    theaterid: String[]
  ) {
    this.movieName = movieName;
    this.movieImage = movieImage;
    this.movieURL = movieURL;
    this.movieReleaseDate = movieReleaseDate;
    this.movieLength = movieLength;
    this.directorName = directorName;
    this.language = language;
    this.movieType = movieType;
    this.synopsis = synopsis;
    this.rating = rating;
    this.feedback = feedback;
    this.theaterid = theaterid;
  }
}
