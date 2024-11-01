import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { theater } from "../../../Models/theater";
import { Observable } from "rxjs";
import { TheaterService } from "../../../Services/theater.service";

@Component({
  selector: "app-cinema",
  templateUrl: "./cinema.component.html",
  styleUrls: ["./cinema.component.scss"],
})
export class CinemaComponent implements OnInit {
  title = "My first AGM project";

  theatre: theater;

  constructor(
    public theaterService: TheaterService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const id = this.activatedRoute.snapshot.params["id"];

    let theater$: Observable<theater> = theaterService.viewTheaterDetail(id);
    theater$.subscribe((theatre) => {
      this.theatre = theatre;
    });
  }

  ngOnInit() {}


}
