
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MovieService } from '../../../Services/movie.service';
import { movie } from '../../../Models/movie';
import { ActivatedRoute, Router } from '@angular/router';

import { theater } from '../../../Models/theater';
import { TheaterService } from '../../../Services/theater.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss']
})
export class MovieUpdateComponent implements OnInit {
  public movieForm: FormGroup;

  images;
  list: Array<theater>;  
  movieId: string;
  movie: movie;
 
  cookievalue = 'unknown';
  
  adminRedact:string;
 

  constructor(private http: HttpClient,private activatedRoute:ActivatedRoute,   private fb: FormBuilder,public theaterService: TheaterService,public route: Router,private cookieService:CookieService,public movieservice: MovieService) { 

    let theaters$: Observable<Array<theater>> = theaterService.get_Theaters();
    theaters$.subscribe(theaters => {
      this.list = theaters;
      
    }  );


    this.movieForm = this.fb.group({
      movieName: '',
      movieImage: '',
      movieURL: '',
      movieReleaseDate: '',
      movieLength: '',
      directorName: '',
      language: '',
      movieType: '',
      synopsis: '',
      rating: ''
 
      
    });
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    
    this.movieservice.get_single_Movie(this.movieId)
      .subscribe(data => {
        console.log(data)
        this.movie = data;
        this.movieForm.controls["movieName"].setValue(this.movie.movieName);
        this.movieForm.controls["movieImage"].setValue(this.movie.movieImage);
        this.movieForm.controls["movieURL"].setValue(this.movie.movieURL);
        this.movieForm.controls["movieReleaseDate"].setValue(this.movie.movieReleaseDate);
        this.movieForm.controls["movieLength"].setValue(this.movie.movieLength);
        this.movieForm.controls["directorName"].setValue(this.movie.directorName);
        this.movieForm.controls["language"].setValue(this.movie.language);
        this.movieForm.controls["movieType"].setValue(this.movie.movieType);
       this.movieForm.controls["synopsis"].setValue(this.movie.synopsis);
        this.movieForm.controls["rating"].setValue(this.movie.rating);
      }, error => console.log(error));
    // Set Values


  
  }


  ngOnInit() {
    this.cookievalue = this.cookieService.get('UserDetails')
    if(!this.cookievalue)
    {
      this.adminRedact=null
    }
    else {
    if(JSON.parse(this.cookievalue).user.role=="redactor" || JSON.parse(this.cookievalue).user.role=="admin")
    {
      this.adminRedact=JSON.parse(this.cookievalue).user.role

    }
    else
    {this.adminRedact=null
     }
    }

    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    
    this.movieservice.get_single_Movie(this.movieId)
      .subscribe(data => {
        console.log(data)
        this.movie = data;
      }, error => console.log(error));
  }

updateMovie(){
this.movie=this.movieForm.value


  let movies$: Observable<movie> = this.movieservice.update_Movie(this.movieId,this.movie);
  movies$.subscribe(() => {
    this.onAddImage()
    this.movieservice.get_single_Movie(this.movieId).subscribe(response => {
    console.log(response)
this.route.navigate(["/"])
}
  

    )})
}


selectImage(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.images = file;

    this.movieForm.controls["movieImage"].setValue(this.images.name);
  }
}







onAddImage(){
  const formData = new FormData();
  formData.append('file', this.images);


  this.http.post<any>('http://localhost:3000/file', formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
}

onSubmit() {
  this.updateMovie();    
}

}
