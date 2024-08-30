import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error("REDIS_URL is not defined in your environment variables.");
}

const REDIS_URL="redis://default:kJnd5i0ccvDMqqVQWdOPPJByQFkgr4c7@redis-11273.c327.europe-west1-2.gce.redns.redis-cloud.com:11273"

const redis = new Redis(REDIS_URL);

export default redis;