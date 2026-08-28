import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Save {
    @Field()
    id: string;

    @Field()
    userId: string;

    @Field()
    pinId: string;

    @Field()
    createdAt: string;
}

@ObjectType()
export class GetSavesResponse {
    @Field(() => [Save])
    saves: Save[];
}

@InputType()
export class AddSaveInput {
    @Field()
    pinId: string;

    @Field({ nullable: true })
    boardId?: string;
}

@InputType()
export class RemoveSaveInput {
    @Field()
    pinId: string;

    @Field({ nullable: true })
    boardId?: string;
}
