const NodeGeocoder = require('node-geocoder');
const db = require("../models/coordinates");

/**
 * Fetches the lat long of the location
 * @param {string} str Search String
 * @return {Object} location Location object contains lat log address
 */
const getLatLong = async (str) => {
    try {
        const options = {
            provider: 'openstreetmap'
        };
        const geocoder = NodeGeocoder(options);
        const location = await geocoder.geocode(str);
        return location;
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}

/**
 * Verify if point of coordinates (longitude, latitude) is polygon of coordinates
 * @param {number} latitude Latitude
 * @param {number} longitude Longitude
 * @return {array<[number,number]>} 
 */
const isPointInPolygon = async (latitude, longitude) => {
    try {
        const validLat = latitude >= -90 && latitude <= 90;
        const validLong = longitude >= -90 && longitude <= 180;
        if (validLat && validLong) {
            const result = await db.findOne({
                'geometry': {
                    $geoIntersects: {
                        $geometry: {
                            "type": "Point",
                            "coordinates": [longitude, latitude]
                        }
                    }
                }
            })
            return result ? result.toObject() : {};
        } else {
            return new Error("invalid lat long");
        }
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
}

module.exports = { getLatLong, isPointInPolygon };