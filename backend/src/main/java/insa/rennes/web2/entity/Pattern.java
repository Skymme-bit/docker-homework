package insa.rennes.web2.entity;

import java.util.List;

public class Pattern {
    private int number;
    private List<Tile> tiles;

    public Pattern(int number, List<Tile> tiles) {
        this.number = number;
        this.tiles = tiles;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public List<Tile> getTiles() {
        return tiles;
    }

    public void setTiles(List<Tile> tiles) {
        this.tiles = tiles;
    }
}
