package myapi.netflix;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "netflix")
@Getter
@Setter
public class NetflixShow {

    @Id
    private Integer id;

    private String title;

    private String director;

    private String country;

    private Integer releaseYear;

    private String duration;

    private String genre;
}
