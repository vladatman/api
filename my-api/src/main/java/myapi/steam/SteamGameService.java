package myapi.steam;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SteamGameService {
    private final SteamGameRepository steamGameRepository;

    public SteamGameService(SteamGameRepository steamGameRepository) {
        this.steamGameRepository = steamGameRepository;
    }

    public Map<Integer, Integer> findAllRecordsByMonths() {
        Map<Integer, Integer> mapOfRecords = new HashMap<>();
        for (int i = 1; i <= 12; i++) {
            mapOfRecords.put(i, steamGameRepository.findRecordsByMonth(i));
        }
        return mapOfRecords;
    }
}
