import { Player } from "./player";
import { Grid } from "./grid";

export class Game {

  public readonly idGame: string;  // L'identifiant du jeu
  public scoreValue: number;
  public readonly gridData: Grid;
  public readonly playerData: Player;
  // TODO : Ajouter l'attribut historique

  // eslint-disable-next-line @typescript-eslint/max-params
  public constructor(grid: Grid, player: Player, score = 0, id: string = Math.random().toString(36)) {
    this.playerData = player;
    this.scoreValue = score;
    this.gridData = grid;
    this.idGame = id;
  }

  // Accesseur pour idGame
  public get gameId(): string {
    return this.idGame;
  }

  // Accesseur et modificateur pour `score`
  public get score(): number {
    return this.scoreValue;
  }

  public set score(newScore: number) {
    if (newScore >= 0) {
      this.scoreValue = newScore;
    }
  }

  // Accesseur pour `grid`
  public get grid(): Grid {
    return this.gridData;
  }

  // Accesseur pour `player`
  public get player(): Player {
    return this.playerData;
  }

  // Méthode pour augmenter le score
  public increaseScore(): number {
    // TODO : Ajouter la logique du score
    this.scoreValue += 1;
    return this.scoreValue;
  }

  // Méthode pour vérifier les motifs
  public checkPattern(): boolean {
    // TODO : Ajouter la logique de vérification des motifs
    return true;
  }
}
