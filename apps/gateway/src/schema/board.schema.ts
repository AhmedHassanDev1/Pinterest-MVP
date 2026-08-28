import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Board {
    @Field()
    id: string;

    @Field()
    userId: string;

    @Field()
    name: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}

@ObjectType()
export class BoardPageInfo {
    @Field({ nullable: true })
    nextCursor?: string;

    @Field(() => Int)
    limit: number;
}

@ObjectType()
export class ListBoardsResponse {
    @Field(() => [Board])
    boards: Board[];

    @Field(() => BoardPageInfo)
    pageInfo: BoardPageInfo;
}

@InputType()
export class CreateBoardInput {
    @Field()
    name: string;

    @Field()
    private: boolean;
}

@InputType()
export class EditeBoardInput {
    @Field()
    boardId: string;

    @Field({ nullable: true })
    boardCover?: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    private?: boolean;
}

@InputType()
export class MergeBoardInput {
    @Field()
    mainBoardId: string;

    @Field()
    nestBoardId: string;
}

@InputType()
export class ListBoardsInput {
    @Field({ nullable: true })
    cursor?: string;

    @Field(() => Int, { defaultValue: 10 })
    limit: number;
}
