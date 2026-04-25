import { Field, ObjectType } from "@nestjs/graphql";
import { Avatar } from "./profile.schema";


@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    email: string

    @Field()
    userName: string

    // @Field()
    // onboardingStep: number

    @Field(() => Avatar)
    avatar: Avatar;

    @Field()
    createdAt: string;

}