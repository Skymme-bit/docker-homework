import { Game } from './game';
import { Grid } from './grid';
import { Player } from './player';

describe('Game', () => {
  it('should create an instance', () => {
    const grid = new Grid('grid1', 'Test Grid', ['tile1', 'tile2', 'tile3'], [1, 2, 3]);
    const player = new Player('player1', 'Player One');
    expect(new Game(grid, player));
  });
});
