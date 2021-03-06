import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  user_id! : number;
  
  @Field(() => String)
  @Property({type: "date", default: 'NOW()'})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date()})
  updatedAt = new Date();

  @Field()
  @Property({type: "text", unique:true})
  username! : string;

  @Property({type: "text"})
  password!: string;

}