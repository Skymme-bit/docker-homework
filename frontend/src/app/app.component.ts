import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RestService} from "./services/rest.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  public constructor(private readonly restService: RestService) {}

  public ngOnInit(): void {
    this.fetchRanking();
    this.fetchGridById();
  }

  public fetchRanking(): void {
    this.restService.getRankings('eazf5d')
      .then((rankings) => {
        console.log('Classements reçus :', rankings);
      })
      .catch((err: unknown) => {
        console.error('Erreur lors de la récupération des classements :', err);
      });
  }


  public fetchGridById(): void {
    this.restService.getGridById('eazf5d')
      .then((grid) => {
        console.log('Grille reçus :', grid);
      })
      .catch((err: unknown) => {
        console.error('Erreur lors de la récupération des classements :', err);
      });
  }
}
