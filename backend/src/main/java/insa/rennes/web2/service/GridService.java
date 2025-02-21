package insa.rennes.web2.service;

import insa.rennes.web2.entity.Grid;
import insa.rennes.web2.entity.Pattern;
import insa.rennes.web2.entity.Tile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GridService {
    private final List<Grid> grids;

    public GridService() {
        grids = new ArrayList<>();
        grids.add(new Grid("eazf5d", "dev",
                List.of(new Tile("dev", "angular", "webp"),
                        new Tile("dev", "gitlab", "webp"),
                        new Tile("dev", "java", "webp"),
                        new Tile("dev", "npm", "webp"),
                        new Tile("dev", "spring", "webp"),
                        new Tile("dev", "ts", "webp"),
                        new Tile("dev", "angular", "webp"),
                        new Tile("dev", "ts", "webp"),
                        new Tile("dev", "ts", "webp"),
                        new Tile("dev", "npm", "webp"),
                        new Tile("dev", "npm", "webp"),
                        new Tile("dev", "spring", "webp"),
                        new Tile("dev", "angular", "webp"),
                        new Tile("dev", "java", "webp"),
                        new Tile("dev", "gitlab", "webp"),
                        new Tile("dev", "vide", "webp")
                ),
                List.of(
                        new Pattern(3,
                                List.of(new Tile("dev", "npm", "webp"),
                                        new Tile("dev", "angular", "webp"))
                        ),
                        new Pattern(3,
                                List.of(new Tile("dev", "npm", "webp"),
                                        new Tile("dev", "ts", "webp"))
                        ),
                        new Pattern(2,
                                List.of(new Tile("dev", "gitlab", "webp"),
                                        new Tile("dev", "java", "webp"))
                        )
                )
        ));
    }

    public List<Grid> getGrids() {
        return grids;
    }

    public Grid getGridById(String id) {
        return grids.stream()
                .filter(grid -> grid.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public List<String> getGridsId() {
        return grids.stream().map(Grid::getId).collect(Collectors.toList());
    }
}
