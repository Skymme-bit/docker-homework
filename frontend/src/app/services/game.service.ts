import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Game } from '../classes/game';
import { RestService } from './rest.service';
import { Grid } from '../classes/grid';
import { Player } from '../classes/player';
import { Pattern } from '../classes/pattern';
import { Tile } from "../classes/tile";
import {Ranking} from "../classes/ranking";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public readonly game$ = new BehaviorSubject<Game | null>(null);
  public readonly isGameReady$ = new BehaviorSubject<boolean>(false);
  public readonly isGameEnd$ = new BehaviorSubject<boolean>(false);
  private readonly top5Rankings$ = new BehaviorSubject<{ score: number; idPlayer: string }[]>([]);
  public tilesAfterMove: Tile[];

  public constructor(private readonly restService: RestService) {}

  // #region Getters
  public get game(): Game | null {
    return this.game$.getValue();
  }

  public get isGameEnd(): boolean {
    return this.isGameEnd$.getValue();
  }

  public get gridTiles(): Tile[] {
    return this.game?.grid.gridTiles ?? [];
  }

  public get gridId(): string {
    return this.game?.grid.gridId ?? "";
  }

  public get gridName(): string {
    return this.game?.grid.gridName ?? "";
  }

  public get gridPatterns(): Pattern[] {
    return this.game?.grid.gridPatterns ?? [];
  }

  public get playerId(): string {
    return this.game?.player.idPlayer ?? "";
  }

  public get playerName(): string {
    return this.game?.player.name ?? "";
  }

  public get score(): number {
    return this.game?.score ?? 0;
  }

  public get currentPattern(): Pattern {
    return this.gridPatterns[this.gridPatterns.length - 1];
  }

  public getTile(index: number): Tile | null {
    return this.gridTiles[index];
  }

  public get top5Rankings(): BehaviorSubject<{ score: number; idPlayer: string }[]> {
    return this.top5Rankings$;
  }

  // #endregion

  // #region Setters
  public set grid(gridtiles: Tile[]) {
    const newGame = new Game(
      new Grid(this.gridId, this.gridName, gridtiles, this.gridPatterns),
      new Player(this.playerId,this.playerName),
      this.score
    );
    this.game$.next(newGame);
  }
   // #endregion

  // #region Game Lifecycle

  public async startGame(namePlayer: string | undefined, idGrid: string): Promise<void> {
    namePlayer = namePlayer ?? this.generateName();
    const idPlayer = this.generatePlayerId();

    try {
      await this.generateGame(idPlayer, namePlayer, idGrid);

      this.findMaxPatterns();

      console.log(this.gridPatterns);
      this.isGameEnd$.next(false);
      this.isGameReady$.next(true);
    } catch (error) {
      console.error("Erreur lors du démarrage du jeu:", error);
      this.isGameEnd$.next(false);
      this.isGameReady$.next(false);
    }
  }

  public async generateGame(idPlayer: string, namePlayer: string, idGrid: string): Promise<void> {
    try {
      const gridData = await this.restService.getGridById(idGrid);

      const newGame = new Game(
        new Grid(gridData.idGrid, gridData.name, gridData.tiles, gridData.patterns),
        new Player(idPlayer, namePlayer)
      );
      this.game$.next(newGame);

    } catch (error) {
      console.error('Erreur lors de la génération du jeu:', error);
      throw error;
    }
  }

  public endGame(): void {
    this.game$.next(null);
    this.isGameEnd$.next(false);
    this.isGameReady$.next(false);
  }

  public async saveCurrentPlayerRanking(): Promise<void> {
    const game = this.game$.getValue();
    if (!game) {
      console.error('Impossible de sauvegarder le classement : aucun jeu en cours.');
      return;
    }

    const ranking = new Ranking(
      this.score+1,
      this.playerName,
      this.gridId
    );

    try {
      await this.restService.saveRanking(ranking);
      console.log('Classement sauvegardé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du classement :', error);
    }
  }


  // #endregion

  // #region Tile Operations

  public moveTile(tilePosition: number): void {
    let emptyPos = -1;
    let direction = -1;

    // Check right
    for (let i = tilePosition + 1; i % 4 !== 0 && i < 16; i++) {
      if (this.tileIsEmpty(i)) {
        emptyPos = i;
        direction = 0;
        break;
      }
    }

    // Check left
    for (let i = tilePosition - 1; i % 4 !== 3 && i >= 0 && emptyPos < 0; i--) {
      if (this.tileIsEmpty(i)) {
        emptyPos = i;
        direction = 1;
        break;
      }
    }

    // Check up
    for (let i = tilePosition - 4; i >= 0 && emptyPos < 0; i -= 4) {
      if (this.tileIsEmpty(i)) {
        emptyPos = i;
        direction = 2;
        break;
      }
    }

    // Check down
    for (let i = tilePosition + 4; i < 16 && emptyPos < 0; i += 4) {
      if (this.tileIsEmpty(i)) {
        emptyPos = i;
        direction = 3;
        break;
      }
    }

    if (emptyPos >= 0) {
      this.applyMovement(tilePosition, emptyPos, direction);
    }
  }

  private applyMovement(tilePosition: number, emptyPos: number, direction: number): void {
    const tiles = [...this.gridTiles];
    let cost = 0;

    // Apply movement
    switch (direction) {
      case 0: // Right
        for (let i = emptyPos; i > tilePosition; i--) {
          tiles[i] = tiles[i - 1];
          cost++;
        }
        break;
      case 1: // Left
        for (let i = emptyPos; i < tilePosition; i++) {
          tiles[i] = tiles[i + 1];
          cost++;
        }
        break;
      case 2: // Up
        for (let i = emptyPos; i < tilePosition; i += 4) {
          tiles[i] = tiles[i + 4];
          cost++;
        }
        break;
      case 3: // Down
        for (let i = emptyPos; i > tilePosition; i -= 4) {
          tiles[i] = tiles[i - 4];
          cost++;
        }
        break;
    }

    tiles[tilePosition] = new Tile();
    this.findMaxPatterns(tiles);

    this.tilesAfterMove=tiles;

    this.updateGrid(tiles);
    this.incrementScore(cost);
  }

  public tileIsEmpty(index: number): boolean {
    return this.getTile(index)?.name === 'vide';
  }

  public updateGrid(tiles: Tile[]): void {
    const currentGame = this.game;
    if (currentGame) {
      const updatedGame = new Game(
        new Grid(currentGame.grid.gridId, currentGame.grid.gridName, tiles, currentGame.grid.gridPatterns),
        currentGame.player,
        currentGame.score
      );
      this.game$.next(updatedGame);
    }
  }

  // #endregion

  // #region Score and Patterns

  public incrementScore(cost = 1): void {
    const currentGame = this.game;
    if (currentGame) {
      const updatedGame = new Game(
        currentGame.grid,
        currentGame.player,
        currentGame.score + cost
      );
      this.game$.next(updatedGame);
    } else {
      console.error('Impossible d’incrémenter le score: aucune partie chargée.');
    }
  }

  public findMaxPatterns(tiles = this.gridTiles): Tile[] {

    tiles.forEach(tile => (tile.isColored = false));
    const rows = 4;
    const cols = 4;
    const { motifs } = this.currentPattern;
    if (motifs.length < 2) {
      console.error('Le motif actuel doit contenir au moins deux motifs pour rechercher des patterns.');
      return tiles;
    }

    const [motif1, motif2] = motifs;

    // Tableau pour suivre les tuiles visitées
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const visited: boolean[] = Array(tiles.length).fill(false);

    let patternCount = 0;
    const patternLocations: [number, number][] = [];

    // Fonction pour valider si deux tuiles forment un pattern valide
    function isValidPattern(idx1: number, idx2: number): boolean {
      if (
        idx1 >= 0 && idx1 < tiles.length &&
        idx2 >= 0 && idx2 < tiles.length
      ) {
        if (!visited[idx1] && !visited[idx2]) {
          const tile1 = tiles[idx1];
          const tile2 = tiles[idx2];
          return (
            (tile1.name === motif1 && tile2.name === motif2)
          );
        }
      }
      return false;
    }

    // Chercher des motifs horizontaux uniquement
    const possiblePatterns: [number, number][] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const idx = i * cols + j;

        // Vérifier seulement les motifs horizontaux
        if (j + 1 < cols) {
          const idxRight = idx + 1;
          if (isValidPattern(idx, idxRight)) {
            possiblePatterns.push([idx, idxRight]);
          }
        }
      }
    }

    // Marquer les motifs trouvés et compter
    for (const [idx1, idx2] of possiblePatterns) {
      if (!visited[idx1] && !visited[idx2]) {
        visited[idx1] = true;
        visited[idx2] = true;
        patternLocations.push([idx1, idx2]);
        patternCount++;
      }
    }

    console.log(patternCount);

    // Colorer les tuiles dans les motifs trouvés
    for (const [index1, index2] of patternLocations) {
      tiles[index1].isColored = true;
      tiles[index2].isColored = true;
    }

    if (patternCount >= this.currentPattern.number) {
      if(this.gridPatterns.length <= 1) {
        this.isGameEnd$.next(true);
        return tiles;
      } else {
        this.gridPatterns.pop();
        return this.findMaxPatterns(tiles);
      }
    }

    return tiles;
  }

  // #endregion

  // #region Utility Methods

  public generateName(): string {
    const names = ['Siamois', 'Bengal', 'Angora', 'Chartreux', 'Persan', 'Sphynx', 'Tiffany', 'Savannah'];
    return names[Math.floor(Math.random() * names.length)];
  }

  public generatePlayerId(): string {
    return String(Math.floor(Math.random() * 1000));
  }

  public async fetchTop5Rankings(idGrid: string): Promise<void> {
    try {
      const rankings = await this.restService.getTop5Rankings(idGrid);
      const formattedRankings = rankings.map(ranking => ({
        score: ranking.score,
        idPlayer: ranking.idPlayer,
      }));
      this.top5Rankings$.next(formattedRankings);
    } catch (error) {
      console.error('Erreur lors de la récupération du classement:', error);
      this.top5Rankings$.next([]); // Réinitialise en cas d'erreur
    }
  }

  // #endregion

  // #region History Methods

  public clickMove():void{

  }

  // #endregion
}
