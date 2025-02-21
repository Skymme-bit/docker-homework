import { Ranking } from './ranking';
import { Grid } from "./grid";
import { Player } from "./player";

describe('Ranking', () => {
  it('should create an instance', () => {
    const grid = new Grid('testGrid', 'Test Grid', ['tile1', 'tile2', 'tile3'], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const players = [
      new Player('player1', 'Player One'),
      new Player('player2', 'Player Two'),
      new Player('player3', 'Player Three'),
      new Player('player4', 'Player Four'),
      new Player('player5', 'Player Five'),
    ];
    const scores = [100, 90, 85, 80, 75];
    expect(new Ranking(grid, players, scores)).toBeTruthy();
  });
});
