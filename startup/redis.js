const redisConn = require("ioredis");
const config = require("config");
const utils = require("../utils/common");

const redis = new redisConn(config.redis.port, config.redis.host, { showFriendlyErrorStack: config.redis.showFriendlyErrorStack });

module.exports.get = async (key) => {
    try {
        const redisKey = utils.getRedisKey(key);
        const data = await redis.get(redisKey);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(error)
        return null;
    }
}

module.exports.set = async (key, value, ttl = 0) => {
    try {
        if (!key || !value) return
        const redisKey = utils.getRedisKey(key);
        if (ttl > 0) {
            redis.set(redisKey, JSON.stringify(value), "EX", ttl);
        } else {
            redis.set(redisKey, JSON.stringify(value));
        }
    } catch (error) {
        console.error(error)
    }
}