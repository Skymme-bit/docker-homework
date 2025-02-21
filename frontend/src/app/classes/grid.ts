import {Pattern} from "./pattern";
import {Tile} from "./tile";

export class Grid {
  public readonly id: string;
  public readonly name: string;
  public readonly tiles: Tile[];
  public readonly patterns: Pattern[];

  // eslint-disable-next-line @typescript-eslint/max-params
  public constructor(id: string, name: string, tiles: Tile[], patterns: Pattern[]) {
    this.id = id;
    this.name = name;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.tiles = tiles.length === 16 ? tiles : new Array(16).fill(new Tile());
    this.patterns = patterns;
  }

  public get gridId(): string {
    return this.id;
  }

  public get gridName(): string {
    return this.name;
  }

  public get gridTiles(): Tile[] {
    return this.tiles;
  }

  public get gridPatterns(): Pattern[] {
    return this.patterns;
  }
}
