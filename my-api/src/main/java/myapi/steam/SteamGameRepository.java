package myapi.steam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface SteamGameRepository extends
        JpaRepository<SteamGame, Integer>,
        JpaSpecificationExecutor<SteamGame> {
    @Query("select count(m) from SteamGame m where function('month',releaseDate) = ?1")
    Integer findRecordsByMonth(Integer monthNumber);

}
