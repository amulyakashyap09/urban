const services = require("../services/address");
const cache = require("../startup/redis");

/**
 * looks for the address in redis first
 * @param {string} address Search String
 * @return {Object} returns the address object from cache
 */
const _getFromCache = async (address) => {
    try {
        return await cache.get(address);
    } catch (error) {
        console.error(error);
        return null;
    }
}

const _fetchAddressDetails = async (address) => {
    const response = {
        status: "OK",
        search: address
    };
    try {
        const addresses = await services.getLatLong(address);
        if (addresses.length) {
            const result = addresses[0];
            const reachedOnLocation = await services.isPointInPolygon(result.latitude, result.longitude);
            if (Object.keys(reachedOnLocation).length) {
                response.location = {};
                let ctr = 0;
                for (let obj of addresses) {
                    response.location[`address${++ctr}`] = obj.formattedAddress
                }
                response.location.serviceArea = reachedOnLocation.properties.Name;
                response.location.latitude = result ? result.latitude : 0;
                response.location.longitude = result ? result.longitude : 0;
                response.location.city = result ? result.city : "";
                response.location.country = result ? result.country : "";
            } else {
                response.status = "NOT_FOUND";
            }
        } else {
            response.status = "NOT_FOUND";
        }
    } catch (error) {
        console.error(error);
        response.status = "INTERNAL_ERROR";
    }
    return response;
}

/**
 * sets the address in redis/cache
 * @param {string} key keyname
 * @param {string} value value for the keyname
 * @param {number} integer expiry of the key
 */
const _setInCache = async (key, value, ttl = 0) => {
    cache.set(key, value, ttl);
}

module.exports.getAddress = async (address) => {
    let response = {
        status: "OK",
        search: address
    };
    try {
        const foundInCache = await _getFromCache(address);
        if (foundInCache) {
            return foundInCache;
        } else {
            response = await _fetchAddressDetails(address);
            if (response && response.status === "OK") {
                _setInCache(address, response)
            }
        }
    } catch (error) {
        console.error(error);
        response.status = "INTERNAL_ERROR"
    }
    return response;
};