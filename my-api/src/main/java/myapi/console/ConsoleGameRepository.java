package myapi.console;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public interface ConsoleGameRepository extends JpaRepository<ConsoleGame, Integer>,
        JpaSpecificationExecutor<ConsoleGame> {
    @Query("select count(m) from ConsoleGame m where function('month',releaseDate) = ?1")
    Integer findRecordsByMonth(Integer monthNumber);
}
