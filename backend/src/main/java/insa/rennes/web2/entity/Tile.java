package insa.rennes.web2.entity;

public class Tile {
    private String source;
    private String name;
    private String extension;

    // Constructeur avec tous les arguments
    public Tile(String source, String name, String extension) {
        this.source = source;
        this.name = name;
        this.extension = extension;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

}
