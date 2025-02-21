package insa.rennes.web2.service;

import insa.rennes.web2.entity.Ranking;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RankingService {
    List<Ranking> rankings;

    public RankingService() {
        this.rankings = new ArrayList<>();
        rankings.add(new Ranking(100, "player1", "eazf5d"));
        rankings.add(new Ranking(200, "player2", "eazf5d"));
        rankings.add(new Ranking(50, "player3", "eazf5d"));
        rankings.add(new Ranking(300, "player4", "eazf5d"));
        rankings.add(new Ranking(150, "player5", "eazf5d"));
        rankings.add(new Ranking(250, "player6", "eazf5d"));
    }

    public int getScore(String idPlayer, String idGrid) {
        return rankings.stream()
                .filter(ranking -> ranking.getIdPlayer().equals(idPlayer) && ranking.getIdGrid().equals(idGrid))
                .map(Ranking::getScore)
                .findFirst()
                .orElse(0);
    }

    public List<Ranking> getAllRankings(String idGrid) {
        return rankings.stream()
                .filter(ranking -> ranking.getIdGrid().equals(idGrid))
                .sorted((r1, r2) -> Integer.compare(r1.getScore(), r2.getScore()))
                .collect(Collectors.toList());
    }

    public List<Ranking> getTop5Rankings(String idGrid) {
        return getAllRankings(idGrid).stream()
                .filter(ranking -> ranking.getIdGrid().equals(idGrid))
                .sorted((r1, r2) -> Integer.compare(r1.getScore(), r2.getScore()))
                .limit(5)
                .collect(Collectors.toList());
    }


    public Ranking saveRanking(Ranking newRanking) {
        // Recherche s'il existe déjà un Ranking pour le joueur et la grille
        for (Ranking existingRanking : rankings) {
            if (existingRanking.getIdPlayer().equals(newRanking.getIdPlayer()) &&
                    existingRanking.getIdGrid().equals(newRanking.getIdGrid())) {
                // Vérifie si le nouveau score est meilleur
                if (newRanking.getScore() > existingRanking.getScore()) {
                    existingRanking.setScore(newRanking.getScore()); // Met à jour le score
                    return existingRanking; // Retourne le ranking mis à jour
                }
                return existingRanking; // Retourne l'existant, aucune mise à jour
            }
        }
        // Aucun ranking trouvé, ajoute le nouveau
        rankings.add(newRanking);
        return newRanking;
    }

}
