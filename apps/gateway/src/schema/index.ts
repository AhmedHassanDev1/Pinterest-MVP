import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class SuccessMessage{
    @Field()
    success:Boolean
}