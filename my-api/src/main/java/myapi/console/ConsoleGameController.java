package myapi.console;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/console")
public class ConsoleGameController {

    private final ConsoleGameService consoleGameService;
    private final ConsoleGameRepository consoleGameRepository;

    public ConsoleGameController(ConsoleGameRepository consoleGameRepository, ConsoleGameService consoleGameService) {
        this.consoleGameRepository = consoleGameRepository;
        this.consoleGameService = consoleGameService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsoleGame> getGameById(@PathVariable Integer id) {
        return ResponseEntity.of(consoleGameRepository.findById(id));
    }

    @GetMapping
    public Iterable<ConsoleGame> getAllGames(
            @RequestParam Optional<String> title,
            @RequestParam Optional<String> genre,
            @RequestParam Optional<String> console,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> minRelease,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> maxRelease
    ) {
        Specification<ConsoleGame> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            title.ifPresent(s -> predicates.add(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + s.toLowerCase() + "%")));
            genre.ifPresent(s -> predicates.add(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("genre")), "%" + s.toLowerCase() + "%")));
            console.ifPresent(s -> predicates.add(
                    criteriaBuilder.equal(criteriaBuilder.lower(root.get("console")), s.toLowerCase())));
            minRelease.ifPresent(date -> predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("releaseDate"), date)));
            maxRelease.ifPresent(date -> predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(root.get("releaseDate"), date)));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return consoleGameRepository.findAll(specification);
    }

    @PostMapping("/add")
    public void addGame(@RequestBody ConsoleGame consoleGame) {
        consoleGameRepository.save(consoleGame);
    }

    @GetMapping("/records")
    public Map<Integer, Integer> findRecordsByMonth(){
        return consoleGameService.findAllRecordsByMonths();
    }
}
