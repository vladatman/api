package myapi.steam;

import lombok.RequiredArgsConstructor;
import myapi.netflix.NetflixShow;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/steam")
public class SteamGameController {

    private final SteamGameRepository steamGameRepository;
    private final SteamGameService steamGameService;

    public SteamGameController(SteamGameRepository steamGameRepository, SteamGameService steamGameService) {
        this.steamGameRepository = steamGameRepository;
        this.steamGameService = steamGameService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SteamGame> getGameById(@PathVariable Integer id) {
        return ResponseEntity.of(steamGameRepository.findById(id));
    }

    @GetMapping
    public Iterable<SteamGame> getAllGames(
            @RequestParam Optional<String> title,
            @RequestParam Optional<String> genre,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> minRelease,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> maxRelease,
            @RequestParam Optional<Double> minPrice,
            @RequestParam Optional<Double> maxPrice
    ) {
        Specification<SteamGame> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            title.ifPresent(s -> predicates.add(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + s.toLowerCase() + "%")));
            genre.ifPresent(s -> predicates.add(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("genres")), "%" + s.toLowerCase() + "%")));
            minRelease.ifPresent(date -> predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("releaseDate"), date)));
            maxRelease.ifPresent(date -> predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(root.get("releaseDate"), date)));
            minPrice.ifPresent(d -> predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("price"), d)));
            maxPrice.ifPresent(d -> predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(root.get("price"), d)));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return steamGameRepository.findAll(specification);
    }

    @PostMapping("/add")
    public void addGame(@RequestBody SteamGame steamGame) {
        steamGameRepository.save(steamGame);
    }

    @GetMapping("/records")
    public Map<Integer, Integer> findRecordsByMonth(){
        return steamGameService.findAllRecordsByMonths();
    }
}
