import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { GameService } from '../../../services/game.service';
import { InteractoModule, interactoTreeUndoProviders} from 'interacto-angular';
import { ObjectifComponent } from '../../objectif/objectif.component';
import {AsyncPipe, NgForOf, NgIf, CommonModule} from "@angular/common";
import { SetValue } from '../../../command/set-value';
import {TreeUndoHistory, UndoableSnapshot} from 'interacto';
import { Component, OnInit, OnDestroy,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {MatButton} from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import {ScoreComponent} from "../score/score.component";

@Component({
  selector: 'app-board',
  providers: [interactoTreeUndoProviders()],
  standalone: true,
  imports: [InteractoModule, RouterOutlet, AsyncPipe, ObjectifComponent, MatButton, NgIf, NgForOf, CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  public isGameReady$: Observable<boolean>;
  protected title = 'JEU DE TAQUIN';

  // eslint-disable-next-line @typescript-eslint/max-params
  public constructor(public gameService: GameService, private readonly route: ActivatedRoute, private readonly router: Router, public history:TreeUndoHistory, public cdr: ChangeDetectorRef, public dialog: MatDialog) {
    this.isGameReady$ = this.gameService.isGameReady$;
  }

  public openScorePopup(): void {
    this.dialog.open(ScoreComponent, {});
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async ngOnInit(): Promise<void> {
    this.route.queryParams
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .subscribe(async params => {
        console.log(params);
        if (params['mode'] == null) {
          console.log('No mode selected, redirecting to homepage');
          await this.router.navigate(['/']);
        } else {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            await this.gameService.startGame(params['name'], params['mode']);
          } catch (error) {
            console.error("Erreur lors du démarrage du jeu:", error);
          }
        }
      });
    this.gameService.isGameEnd$.subscribe((isGameEnd) => {
      if (isGameEnd) {
        void this.handleGameEnd();
      }
    });
  }

  public rootRenderer(): UndoableSnapshot {
    console.log("root");
    return SetValue.getSnapshot(this.gameService.game!);;
  }

  public ngOnDestroy(): void {
    this.gameService.endGame();
  }

  public setValue(x: number): void {
    //condition qui permet de ne pas avoir deux fois la grille racine d'affichée dans l'historique
    if(this.gameService.game!.score>=0){
      const action = new SetValue(this.gameService.game!, x, this.gameService, this.cdr);
      console.log("new setValue");
      void action.execute();
      this.history.add(action);
      console.log(this.history);
    }
  }
  private async handleGameEnd(): Promise<void> {
    try {
      await this.gameService.saveCurrentPlayerRanking();
      this.openScorePopup();
    } catch (error) {
      console.error('Erreur lors de la fin du jeu :', error);
    }
  }
}
