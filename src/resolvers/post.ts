import { MyContext } from './../types';
import { Post } from './../entities/Post';
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";

@Resolver()
export class PostResolver{
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]>{
        return em.find(Post, {}) //read
    }

    @Query(() => Post, { nullable: true})
    post(
        @Arg('post_id', () => String) post_id: number,
        @Ctx() { em }: MyContext): Promise<Post| null>{
        return em.findOne(Post, { post_id }) //read
    }
    // Query is to get data 
    //mutation is for creating data

    @Mutation(() => Post)
    async createPost(
        @Arg('post_id') post_id: number,
        @Arg('title') title: string,
        @Ctx() { em }: MyContext
        ): Promise<Post>{
        const post = em.create(Post, {post_id, title})
        await em.persistAndFlush(post)
        return post;
    }

    @Mutation(() => Post, {nullable: true})
    async updatePost(
        @Arg('post_id') post_id: number,
        @Arg('title', () => String, { nullable: true}) title: string,
        @Ctx() { em }: MyContext
        ): Promise<Post | null>{
            const post = em.findOne(Post, {post_id});
            if(!post) {
                return null;
            }
            if (typeof title !== 'undefined'){
                post.title = title;
                await em.persistAndFlush(post);
            }
            return post;
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('post_id') post_id: number,
        @Ctx() { em }: MyContext
        ): Promise<boolean>{
            em.nativeDelete(Post, {post_id});
            return true;
    }

}

