import axios from "axios";
import Redis from "ioredis";
import redisConfig from "../redis/config.redis";

const redis = new Redis(redisConfig);
const cacheDuration = 3600;

export async function fetchAllDataInParallel(baseUrl) {
  const cachedData = await redis.get(baseUrl);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const firstPage = await axios.get(baseUrl);
  const totalPages = Math.ceil(
    firstPage.data.count / firstPage.data.results.length
  );

  // Create an array of promises for all pages
  const requests = Array.from({ length: totalPages }, (_, i) =>
    axios.get(`${baseUrl}?page=${i + 1}`)
  );

  // Resolve all promises and flatten the results
  const responses = await Promise.all(requests);
  const finalResult = responses.flatMap((response) => response.data.results);

  await redis.setex(baseUrl, cacheDuration, JSON.stringify(finalResult));

  return finalResult;
}

export async function fetchAllInParallel(cacheKey, arr) {
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log(`found cache for id:`, cacheKey);
    return JSON.parse(cachedData);
  }
  const requests = arr.map((url) => axios.get(url));
  const responses = await Promise.all(requests);
  const finalResult = responses.map((response) => response.data);

  await redis.setex(cacheKey, cacheDuration, JSON.stringify(finalResult));

  return finalResult;
}
