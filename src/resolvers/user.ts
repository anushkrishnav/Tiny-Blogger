import { MyContext } from './../types';
import { User } from './../entities/User';
import { Resolver, Ctx, Mutation, InputType, Field, Arg, ObjectType } from "type-graphql";
import aragon2 from 'argon2'

@InputType()
class UsernamePasswordIn{
    @Field()
    username: string
    @Field()
    password: string

}

@ObjectType()
class FeildError{
    @Field()
    field: string;
    @Field()
    message: string
}

@ObjectType()
class UserResponse{
    @Field(() =>[FeildError], {nullable: true})
    errors?: FeildError[];

    @Field(() =>User, {nullable: true})
    user?: User;
}

@Resolver()
export class UserResolver{
    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordIn,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse> {

        const user = await em.findOne(User, {username: options.username });
        if (!user){
            return{
                errors: [{
                    field: "username",
                    message: "User doesn't exsist ",

                },
            ],
            };
        }

        const valid = await aragon2.verify(user.password, options.password)
        if(!valid){
            return{
                errors: [{
                    field: "password",
                    message: "Check your password ",

                },
            ],
            };
        }
        await em.persistAndFlush(user);
        
        return {
            user,
        };
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordIn,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse>{
        if(options.username.length <= 4){
            return{
                errors: [
                    {
                    field: "username",
                    message: "Lenght must be greated than 4",
                },
            ],
            };
        }

        if(options.password.length <= 5){
            return{
                errors: [
                    {
                    field: "password",
                    message: "Lenght must be greated than 5",
                },
            ],
            };
        }

        const hashpass = await aragon2.hash(options.password)
        const user = em.create(User, {
            username: options.username,
            password: hashpass,        
        });
        try{
        await em.persistAndFlush(user);
        }
        catch(err){
            console.log('message: ',err);
        }
        return {
            user,
        };
    }
    
}

