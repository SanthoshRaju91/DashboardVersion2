var nodeCache = require('node-cache');
var Cache = new nodeCache({stdTTL: 100, checkperiod: 10000});

Cache.setCache = function(cacheName, cacheValue, logger) {
        Cache.set(cacheName, cacheValue, function(err, success) {
            if(err) {
                logger.error("Error in setting the data in cache" + err);
            } else {
                logger.info("Data added to node-cache");
            }
        });
};
module.exports = Cache;