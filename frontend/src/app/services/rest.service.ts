import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pattern} from "../classes/pattern";
import {Tile} from "../classes/tile";
import {firstValueFrom} from "rxjs";
import {Ranking} from "../classes/ranking";
import {Grid} from "../classes/grid";

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private readonly baseUrl: string;

  public constructor(private readonly http: HttpClient) {
    this.baseUrl = 'http://localhost:8081';
  }

  public async getRankings(idGrid: string): Promise<Ranking[]> {
    const params = new HttpParams().set('id', idGrid);
    return firstValueFrom(this.http.get<Ranking[]>(`${this.baseUrl}/ranking`, { params }))
      .then(rankings => rankings.map(r => new Ranking(r.score, r.idPlayer, r.idGrid)));
  }

  public async getTop5Rankings(idGrid: string): Promise<Ranking[]> {
    const params = new HttpParams().set('id', idGrid);
    return firstValueFrom(this.http.get<Ranking[]>(`${this.baseUrl}/ranking/top5`, { params }))
      .then(rankings => rankings.map(r => new Ranking(r.score, r.idPlayer, r.idGrid)));
  }

  public async getScore(idPlayer: string, idGrid: string): Promise<number> {
    const params = new HttpParams()
      .set('idPlayer', idPlayer)
      .set('idGrid', idGrid);
    return firstValueFrom(this.http.get<number>(`${this.baseUrl}/ranking/player`, { params }));
  }

  public async saveRanking(ranking: Ranking): Promise<Ranking> {
    return firstValueFrom(this.http.post<Ranking>(`${this.baseUrl}/ranking`, ranking))
      .then(r => new Ranking(r.score, r.idPlayer, r.idGrid));
  }

  public async getGridById(id: string): Promise<{
    idGrid: string;
    name: string;
    tiles: Tile[];
    patterns: Pattern[];
  }> {
    const params = new HttpParams().set('id', id);

    return firstValueFrom(this.http.get<Grid>(`${this.baseUrl}/grid/id`, { params }))
      .then(gridData => {
        const tiles = gridData.tiles.map(t => new Tile(t.source, t.name, t.extension));

        const patterns = gridData.patterns.map(p => new Pattern(
          p.number,
          p.tiles.map(t => new Tile(t.source, t.name, t.extension))
        ));

        return {
          idGrid: gridData.id,
          name: gridData.name,
          tiles,
          patterns,
        };
      });
  }

  public async getGrids(): Promise<Grid[]> {
    return firstValueFrom(this.http.get<Grid[]>(`${this.baseUrl}/grid`))
      .then(grids => grids.map(g => new Grid(
        g.id,
        g.gridName,
        g.tiles.map(t => new Tile(t.source, t.name, t.extension)),
        g.patterns.map(p => new Pattern(
          p.number,
          p.tiles.map(t => new Tile(t.source, t.name, t.extension))
        ))
      )));
  }

  public async getGridsId(): Promise<string[]> {
    return firstValueFrom(this.http.get<string[]>(`${this.baseUrl}/grid/ids`, { responseType: 'json' }));
  }
}
