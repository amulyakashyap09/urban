const { assert, expect } = require('chai');
const service = require("../services/address")

describe('getLatLong Test', function () {
    it('should be an object', async function () {
        const address = "White Bear Yard";
        const result = await service.getLatLong(address);
        assert.isArray(result)
    });
    it('should have latitude longitude keys', async function () {
        const address = "White Bear Yard";
        const result = await service.getLatLong(address);
        expect(result[0]).to.have.keys(["city", "country", "countryCode", "formattedAddress", "latitude", "longitude", "neighbourhood", "provider", "state", "streetName", "streetNumber", "zipcode"]);
    });
});

describe('isPointInPolygon Test', function () {
    it('should be an object', async function () {
        const lat = 51.5220923;
        const lon = -0.1098237;
        const result = await service.isPointInPolygon(lat, lon);
        assert.isObject(result)
    });
    it('should return error', async function () {
        const lat = -51.5220923;
        const lon = -199.1098237;
        const result = await service.isPointInPolygon(lat, lon);
        assert.instanceOf(result, Error);
    });
});