import { GameService } from '../services/game.service';
import { SetValue } from './set-value';
import {Game} from '../classes/game';
import { Player } from '../classes/player';
import { Grid } from '../classes/grid';
import { Tile } from '../classes/tile';
import { Pattern } from '../classes/pattern';
import { TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';


describe('SetValue', () => {
  let service: GameService;
  const cdr = {
    // Simule un ChangeDetectorRef vide
    markForCheck: () => {},
    detectChanges: () => {},
  } as ChangeDetectorRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should create an instance', () => {
    expect(new SetValue(new Game(new Grid('testGrid', 'Test Grid', [new Tile()], [new Pattern(1,[])]),new Player("test","test")),0,service,cdr)).toBeTruthy();
  });
});
