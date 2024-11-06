const client = require('../dbconfig/redisConfig');

// Example usage

async function setToRedis(key, value) {
    try {
        const reply = await client.set(key, value);
        console.log(reply); // Outputs 'OK' if successful
        return reply;
    } catch (err) {
        console.error('Error setting to Redis:', err);
    }
}

async function getFromRedis(key) {
    try {
        const value = await client.get(key);
        console.log('Value:', value);
        return value;
    } catch (err) {
        console.error('Error getting from Redis:', err);
    }
}

async function removeFromRedis(key) {
    try {
        const reply = await client.del(key);
        console.log('Delete response:', reply); // 1 if deleted, 0 if not found
        return reply;
    } catch (err) {
        console.error('Error deleting from Redis:', err);
    }
}

module.exports = {
    setToRedis,
    getFromRedis,
    removeFromRedis
};
