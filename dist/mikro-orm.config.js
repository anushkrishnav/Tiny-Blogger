"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
exports.default = {
    entities: [Post_1.Post, User_1.User],
    dbName: "tiny-blogger",
    debug: !constants_1.__prod__,
    clientUrl: "mongodb+srv://AnushAdmin:YdqSp4haFVQ0mOaa@cluster0.0p0ix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    type: "mongo",
};
//# sourceMappingURL=mikro-orm.config.js.map