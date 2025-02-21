import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {GameService} from "../../../services/game.service";
import {AsyncPipe, CommonModule} from "@angular/common";


@Component({
  selector: 'app-score',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/max-params
  public constructor(
    @Inject(MAT_DIALOG_DATA) public players: { name: string; score: number }[],
    private readonly dialogRef: MatDialogRef<ScoreComponent>,
    private readonly router: Router,
    public gameService: GameService
  ) {}

  public closeDialog(): void {
    this.dialogRef.close(); // Ferme uniquement la boîte de dialogue
  }

  public navigateToMenu(): void {
    this.dialogRef.close(); // Ferme la boîte de dialogue
    void this.router.navigate(['/']); // Redirige vers la page menu
  }

  public ngOnInit(): void {
    // Appeler la méthode pour charger le classement
    const idGrid = this.gameService.gridId;
    console.log("id grille : " + idGrid);
    if (idGrid) {
      void this.gameService.fetchTop5Rankings(idGrid);
    }
  }
}
