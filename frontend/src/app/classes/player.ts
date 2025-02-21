export class Player {
  public readonly idPlayer: string;
  public readonly name: string;

  public constructor(id: string, name: string) {
    this.idPlayer = id;
    this.name = name;
  }

  public get playerId(): string {
    return this.idPlayer;
  }

  public get playerName(): string {
    return this.name;
  }

}
