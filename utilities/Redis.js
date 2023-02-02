const Redis = require('ioredis');

class RedisDB {

    connect_redis() {
        try {
            const redis_cli = new Redis("redis://default:XimFv56pupmOjhXWtVrRj2z6M3OfGiPt@redis-10252.c56.east-us.azure.cloud.redislabs.com:10252");
            console.log("connected to redis");
            return redis_cli;
        } catch (error) {
            console.log("Error while connecting to Redis: ", error);
        }
    }
}

module.exports = RedisDB