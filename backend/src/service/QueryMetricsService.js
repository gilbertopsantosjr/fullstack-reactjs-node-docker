import { Queue, Worker } from "bullmq";
import Redis from "ioredis";
import redisConfig from "../infra/redis/config.redis";

export default class QueryMetricsService {
  constructor() {
    // Queues for different metric computations
    this.metricQueue = new Queue("query-metrics", { connection: redisConfig });

    // In-memory storage for current top queries (can be replaced with Redis persistent storage)
    this.topQueries = {
      characters: [],
      films: [],
      search: [],
    };

    this.redisClient = new Redis(redisConfig);
  }

  async trackQuery(type, query) {
    const key = `query-count:${type}:${query}`;
    await this.redisClient.hincrby("query-metrics", key, 1);
  }

  async computeTopQueries() {
    const rawMetrics = await this.redisClient.hgetall("query-metrics");

    // Transform metrics into array of query objects
    const queryMetrics = Object.entries(rawMetrics).map(([key, count]) => {
      const [prefix, type, query] = key.split(":");
      return { type, query, count: parseInt(count, 10) };
    });

    // Group by type and compute percentages
    const typeGroups = {
      characters: [],
      films: [],
      search: [],
    };

    queryMetrics.forEach((metric) => {
      if (typeGroups[metric.type]) {
        typeGroups[metric.type].push(metric);
      }
    });

    // Compute top 5 for each type with percentages
    const topQueriesWithPercentages = {};
    Object.entries(typeGroups).forEach(([type, metrics]) => {
      // Sort metrics by count
      const sortedMetrics = metrics.sort((a, b) => b.count - a.count);

      // Compute total count for percentage
      const totalCount = sortedMetrics.reduce(
        (sum, metric) => sum + metric.count,
        0
      );

      // Compute top 5 with percentages
      topQueriesWithPercentages[type] = sortedMetrics
        .slice(0, 5)
        .map((metric) => ({
          query: metric.query,
          count: metric.count,
          percentage: ((metric.count / totalCount) * 100).toFixed(2),
        }));
    });

    // Update top queries
    this.topQueries = topQueriesWithPercentages;

    return topQueriesWithPercentages;
  }

  // Schedule periodic recomputation
  schedulePeriodicComputation() {
    // Create a worker to handle periodic metric computation
    const metricsWorker = new Worker(
      "query-metrics",
      async (job) => {
        console.log("Recomputing query metrics...");
        await this.computeTopQueries();
      },
      { connection: redisConfig }
    );

    // Add recurring job every 5 minutes
    this.metricQueue.add(
      "periodic-metrics",
      {},
      {
        repeat: {
          every: 5 * 60 * 1000, // 5 minutes
        },
      }
    );
  }

  // Get current top queries
  getTopQueries() {
    return this.topQueries;
  }
}
