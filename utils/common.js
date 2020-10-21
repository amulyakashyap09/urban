const prefix = "ADDRESS_";
module.exports.getRedisKey = (key) => {
    return prefix.concat(key.replace(/[^a-zA-Z ]/g, "").split(" ").join("_"));
}