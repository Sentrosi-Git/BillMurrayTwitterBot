const Twit = require("twit");
const config = require("../config");
const Bill = require(".Bill.js")
const T = new Twit(config.twitterApp);

module.exports = T;
