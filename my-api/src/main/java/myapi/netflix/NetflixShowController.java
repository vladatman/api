package myapi.netflix;

import lombok.RequiredArgsConstructor;
import myapi.console.ConsoleGame;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/netflix")
public class NetflixShowController {

    private final NetflixShowRepository netflixShowRepository;

    public NetflixShowController(NetflixShowRepository netflixShowRepository) {
        this.netflixShowRepository = netflixShowRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<NetflixShow> getShowById(@PathVariable Integer id) {
        return ResponseEntity.of(netflixShowRepository.findById(id));
    }

    @GetMapping
    public Iterable<NetflixShow> getAllShows(
            @RequestParam Optional<String> title,
            @RequestParam Optional<String> genre,
            @RequestParam Optional<String> country,
            @RequestParam Optional<Integer> minRelease,
            @RequestParam Optional<Integer> maxRelease
    ) {
        Specification<NetflixShow> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            title.ifPresent(s -> predicates.add(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + s.toLowerCase() + "%")));
            genre.ifPresent(s -> predicates.add(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("genre")), "%" + s.toLowerCase() + "%")));
            country.ifPresent(s -> predicates.add(
                    criteriaBuilder.equal(criteriaBuilder.lower(root.get("country")), s.toLowerCase())));
            minRelease.ifPresent(year -> predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("releaseYear"), year)));
            maxRelease.ifPresent(year -> predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(root.get("releaseYear"), year)));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return netflixShowRepository.findAll(specification);
    }

    @PostMapping("/add")
    public void addShow(@RequestBody NetflixShow netflixShow) {
        netflixShowRepository.save(netflixShow);
    }
}
