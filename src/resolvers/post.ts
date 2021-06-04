import { MyContext } from './../types';
import { Post } from './../entities/Post';
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class PostResolver{
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]>{
        return em.find(Post, {}) //read
    }

    @Query(() => Post, { nullable: true})
    post(
        @Arg('_id', () => String) _id: string,
        @Ctx() { em }: MyContext): Promise<Post| null>{
        return em.findOne(Post, { _id }) //read
    }
    // Query is to get data 
    //mutation is for creating data

    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
        ): Promise<Post>{
        const post = em.create(Post, {title})
        await em.persistAndFlush(post)
        return post;
    }

}

