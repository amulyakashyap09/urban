const mongoose = require("../startup/db");
const coordinateModel = mongoose.model('coordinates', new mongoose.Schema({}));
module.exports = {
    "findOne": async (query) => {
        try {
            if (!query) return null;
            return await coordinateModel.findOne(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
};