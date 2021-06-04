import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core"
import { User } from './entities/User';

export default {
    entities: [Post, User],
    dbName: "tiny-blogger",
    debug: !__prod__,
    clientUrl: "",
    type: "mongo",
} as Parameters<typeof MikroORM.init>[0];


