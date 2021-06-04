"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
exports.default = {
    entities: [Post_1.Post],
    dbName: "redgold",
    debug: !constants_1.__prod__,
    clientUrl: "mongodb+srv://anushkrishna:bu1ssnessman@cluster0.z7q8c.mongodb.net/admin?authSource=admin&replicaSet=atlas-j496ld-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
    type: "mongo",
};
//# sourceMappingURL=mikro-orm.config.js.map