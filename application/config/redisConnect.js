const process = require("process");
const { RedisStore } = require("connect-redis");
const { createClient } = require("redis");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = createClient({
	url: `redis://${process.env.REDIS_URL}`,
});

let redisStore = new RedisStore({
	client: redisClient,
	prefix: "form-filling:",
});

async function connectRedis() {
	await redisClient.connect();
}

module.exports = { redisStore, redisClient, connectRedis };
