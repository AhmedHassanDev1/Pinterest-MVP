import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./user.schema";


@ObjectType()
export class Avatar {
    @Field()
    publicId: string;

    @Field()
    url: string;
}



@ObjectType()
export class Profile {
    @Field()
    id: string;

    @Field({ nullable: true })
    about: string;

    @Field({ nullable: true })
    location: string;


    @Field({ nullable: true })
    gender: string;

    @Field({ nullable: true })
    website: string;

    @Field(type => Int)
    followerCount: number;

    @Field(type => Int)
    followingsCount: number;

    @Field()
    createdAt: string;

    @Field()
    isVerified: boolean;

    @Field(type => User)
    user: User;
}


// Mutations Input Types

@InputType()
export class UpdateAvatarInput {
    @Field()
    userId: string;

    @Field()
    publicId: string;

    @Field()
    url: string;

}