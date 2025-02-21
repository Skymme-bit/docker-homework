package insa.rennes.web2.entity;

public class Ranking {
    private int score;
    private String idPlayer;
    private String idGrid;

    public Ranking(int score, String idPlayer, String idGrid) {
        this.score = score;
        this.idPlayer = idPlayer;
        this.idGrid = idGrid;
    }

    public String getIdGrid() {
        return idGrid;
    }

    public void setIdGrid(String idGrid) {
        this.idGrid = idGrid;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getIdPlayer() {
        return idPlayer;
    }

    public void setIdPlayer(String idPlayer) {
        this.idPlayer = idPlayer;
    }
}
