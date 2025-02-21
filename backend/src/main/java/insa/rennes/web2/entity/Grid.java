package insa.rennes.web2.entity;

import java.util.List;

public class Grid {
    private String id;
    private String name;
    private List<Tile> tiles;
    private List<Pattern> patterns;

    public Grid(String id, String name, List<Tile> tiles, List<Pattern> patterns) {
        this.id = id;
        this.name = name;
        this.tiles = tiles;
        this.patterns = patterns;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Tile> getTiles() {
        return tiles;
    }

    public void setTiles(List<Tile> tiles) {
        this.tiles = tiles;
    }

    public List<Pattern> getPatterns() {
        return patterns;
    }

    public void setPatterns(List<Pattern> patterns) {
        this.patterns = patterns;
    }
}
