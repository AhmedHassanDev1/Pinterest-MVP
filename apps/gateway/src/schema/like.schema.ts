import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Like {
    @Field()
    userId: string;

    @Field()
    pinId: string;

    @Field()
    createdAt: string;
}

@InputType()
export class AddLikeInput {
    @Field()
    pinId: string;
}

@InputType()
export class RemoveLikeInput {
    @Field()
    pinId: string;
}
