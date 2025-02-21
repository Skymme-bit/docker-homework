import { Grid } from './grid';
import {Pattern} from "./pattern";
import {Tile} from "./tile";

describe('Grid', () => {
  it('should create an instance', () => {
    expect(new Grid('testGrid', 'Test Grid', [new Tile()], [new Pattern(1,[])])).toBeTruthy();
  });
});
