import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class SuccessMessage{
    @Field()
    success:Boolean
}

export * from './board.schema';
export * from './save.schema';
export * from './like.schema';