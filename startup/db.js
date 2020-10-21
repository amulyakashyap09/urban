const mongoose = require("mongoose"),
    config = require("config"),
    Log = console;

const disableDebug = process.env.NODE_ENV === "production";

!disableDebug && mongoose.set("debug", true);

mongoose.connect(config.mongo.uri, {
    server: { socketOptions: { keepAlive: 1 } }
});

mongoose.set("useFindAndModify", false);

const connection = mongoose.connection;

connection.once("open", function callback() {
    Log.debug("Connected to Mongo:", config.mongo.ab);
});

connection.on("error", function () {
    Log.error("Error connecting Mongo at:", config.mongo.ab);
});

connection.on("disconnected", function () {
    Log.warn("Disconnected Mongo at:", config.mongo.ab);
});

module.exports = mongoose;