import { Tile } from "./tile";

export class Pattern {
  public readonly number: number;
  public readonly tiles: Tile[];

  /**
   * Constructeur pour la classe Pattern.
   * @param times Nombre de fois que le motif est répété.
   * @param tiles Liste des tuiles associées au motif.
   */
  public constructor(times: number, tiles: Tile[]) {
    this.number = times;
    this.tiles = tiles;
  }

  /**
   * Retourne une liste des motifs (propriété `motif`) des tuiles.
   */
  public get motifs(): string[] {
    return this.tiles.map(tile => tile.name);
  }
}
