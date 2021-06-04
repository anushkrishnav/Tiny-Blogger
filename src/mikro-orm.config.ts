import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core"

export default {
    entities: [Post],
    dbName: "redgold",
    debug: !__prod__,
    clientUrl: "mongodb+srv://anushkrishna:bu1ssnessman@cluster0.z7q8c.mongodb.net/admin?authSource=admin&replicaSet=atlas-j496ld-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
    type: "mongo",
} as Parameters<typeof MikroORM.init>[0] ;

// "mongodb+srv://anushkrishna:bu1ssnessman@cluster0.z7q8c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"