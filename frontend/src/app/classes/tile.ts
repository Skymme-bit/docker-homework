export class Tile {
  public readonly source: string;
  public readonly name: string;
  public readonly extension: string;
  private _isColored: boolean;
  public readonly isHoverable: boolean;

  public constructor(src = "dev", motif = "vide", extension = "webp") {
    this.source = src;
    this.name = motif;
    this.extension = extension;
    this._isColored = false;
    this.isHoverable = motif !== "vide";
  }

  public get isColored(): boolean {
    return this._isColored;
  }

  public set isColored(value: boolean) {
    this._isColored = value;
  }

  public get path(): string | null {
    if (this.name === "vide") {
      return null;
    }
    return `${this.source}/${this.name}.${this.extension}`;
  }
}
