package com.swp391.JewelryProduction.services.crawl;

import com.swp391.JewelryProduction.pojos.Material;
import com.swp391.JewelryProduction.repositories.MaterialRepository;
import com.swp391.JewelryProduction.services.connection.ConnectionPage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class CrawlDataService implements ICrawlDataService {

    private final MaterialRepository materialRepository;
    private final ConnectionPage connection;

    @Value("${exchange.url}")
    private String urlExchange;

    @Value("${page.url}")
    private String urlPage;

    @Override
    public void crawData() {
        log.info("Starting to crawl data ...");
        List<Material> materials = new ArrayList<>();

        ExecutorService executorService = Executors.newSingleThreadExecutor();

        try {
            CrawlThread crawlThread = CrawlThread.builder()
                    .materials(materials)
                    .connection(connection)
                    .urlExchange(urlExchange)
                    .urlPage(urlPage)
                    .build();

            executorService.execute(crawlThread);

            executorService.shutdown();
            if (!executorService.awaitTermination(300, TimeUnit.SECONDS)) {
                log.warn("Executor did not terminate in the specified time.");
                List<Runnable> droppedTasks = executorService.shutdownNow();
                log.warn("Executor was abruptly shut down. " + droppedTasks.size() + " tasks will not be executed.");
            }

            materialRepository.saveAll(materials);
            log.info("Finished crawling data!");

        } catch (InterruptedException e) {
            log.error("Crawling was interrupted", e);
            Thread.currentThread().interrupt();
        } catch (Exception e) {
            log.error("Error during data crawling", e);
        } finally {
            if (!executorService.isTerminated()) {
                log.warn("Forcing executor shutdown...");
                executorService.shutdownNow();
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduledCrawl() {
        try {
            crawData();
        } catch (Exception e) {
            log.error("Scheduled crawling failed", e);
        }
    }

    public List<Material> getAll() {
        try {
            return materialRepository.findAll();
        } catch (Exception e) {
            log.error("Error fetching components", e);
            return new ArrayList<>();
        }
    }
}
