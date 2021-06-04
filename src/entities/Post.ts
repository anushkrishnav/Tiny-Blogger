import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field(() => String)
  @PrimaryKey()
  _id! : string;
  
  @Field(() => String)
  @Property({type: "date", default: 'NOW()'})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date()})
  updatedAt = new Date();

  @Field(() => String)
  @Property({type: "text"})
  title! : string;

}