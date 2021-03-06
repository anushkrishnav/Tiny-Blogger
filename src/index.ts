import "reflect-metadata" // must add
import { PostResolver } from './resolvers/post';
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config"
import {MikroORM} from "@mikro-orm/core"
// import {createConnection} from "typeorm"
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from "./resolvers/user";


const main = async () => {
    const orm = await MikroORM.init(microConfig)
    const app = express(); 

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,    
        }),
        context: () => ({ em: orm.em })
    });
    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log("server has started on localhost:4000")
    })
};

main().catch((err) => {
    console.error(err);
});