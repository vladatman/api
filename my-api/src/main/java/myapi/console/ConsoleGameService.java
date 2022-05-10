package myapi.console;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ConsoleGameService {
    private final ConsoleGameRepository consoleGameRepository;

    public ConsoleGameService(ConsoleGameRepository consoleGameRepository) {
        this.consoleGameRepository = consoleGameRepository;
    }

    public Map<Integer, Integer> findAllRecordsByMonths() {
        Map<Integer, Integer> mapOfRecords = new HashMap<>();
        for (int i = 1; i <= 12; i++) {
            mapOfRecords.put(i, consoleGameRepository.findRecordsByMonth(i));
        }
        return mapOfRecords;
    }
}
