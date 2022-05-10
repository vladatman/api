package myapi.console;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "console")
@Getter
@Setter
public class ConsoleGame {

    @Id
    private Integer id;

    private String title;

    private String console;

    private String genre;

    private String developer;

    private Double totalSales;

    private LocalDate releaseDate;
}
