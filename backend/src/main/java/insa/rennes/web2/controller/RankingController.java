package insa.rennes.web2.controller;

import insa.rennes.web2.entity.Ranking;
import insa.rennes.web2.service.RankingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/ranking")
public class RankingController {
    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @PostMapping
    public ResponseEntity<Ranking> saveRanking(@RequestBody Ranking ranking) {
        Ranking newRanking = rankingService.saveRanking(ranking);
        return ResponseEntity.status(HttpStatus.CREATED).body(newRanking);
    }

    @GetMapping
    @ResponseBody
    public List<Ranking> getAllRankings(@RequestParam String id) {
        return rankingService.getAllRankings(id);
    }

    @GetMapping("/top5")
    @ResponseBody
    public List<Ranking> getTop5Rankings(@RequestParam String id) {
        return rankingService.getTop5Rankings(id);
    }

    @GetMapping("/player")
    @ResponseBody
    public int getScore(@RequestParam String idPlayer, @RequestParam String idGrid) {
        return rankingService.getScore(idPlayer, idGrid);
    }
}
