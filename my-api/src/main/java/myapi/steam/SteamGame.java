package myapi.steam;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "steam")
@Getter
@Setter
public class SteamGame {

    @Id
    private Integer id;

    private String title;

    private LocalDate releaseDate;

    private String developer;

    private String genres;

    private Double price;
}
