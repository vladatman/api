package myapi.netflix;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface NetflixShowRepository extends
        JpaRepository<NetflixShow, Integer>,
        JpaSpecificationExecutor<NetflixShow> {

}
