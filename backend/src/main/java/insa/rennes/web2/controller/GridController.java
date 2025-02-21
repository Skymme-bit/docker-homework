package insa.rennes.web2.controller;

import insa.rennes.web2.entity.Grid;
import insa.rennes.web2.service.GridService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/grid")
public class GridController {

    private final GridService gridService;

    public GridController(GridService gridService) {
        this.gridService = gridService;
    }

    @GetMapping
    public List<Grid> getAllGrids() {
        return gridService.getGrids();
    }

    @GetMapping("/id")
    @ResponseBody
    public Grid getGridById(@RequestParam String id) {
        return gridService.getGridById(id);
    }

    @GetMapping("/ids")
    public List<String> getGridsId() {
        return gridService.getGridsId();
    }
}
