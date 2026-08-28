import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { BoardService } from "../services/board.service";
import { Board, CreateBoardInput, EditeBoardInput, MergeBoardInput, ListBoardsResponse, ListBoardsInput } from "../schema/board.schema";
import { SuccessMessage } from "../schema";
import { CurrentUser } from "../decorators/currentUser.decorator";

@Resolver()
export class BoardResolver {
    constructor(private boardService: BoardService) {}

    @Mutation(() => Board)
    async createBoard(
        @Args("createBoardInput", { type: () => CreateBoardInput }) input,
        @CurrentUser("id") userId: string
    ) {
        return await this.boardService.createBoard({ ...input, userId });
    }

    @Query(() => Board)
    async getBoard(@Args("id") id: string) {
        return await this.boardService.getBoardById(id);
    }

    @Mutation(() => SuccessMessage)
    async deleteBoard(@Args("id") id: string) {
        return await this.boardService.deleteBoard(id);
    }

    @Mutation(() => Board)
    async editeBoard(@Args("editeBoardInput", { type: () => EditeBoardInput }) input) {
        return await this.boardService.editBoard(input);
    }

    @Mutation(() => Board)
    async mergeBoard(@Args("mergeBoardInput", { type: () => MergeBoardInput }) input) {
        return await this.boardService.mergeBoard(input);
    }

    @Query(() => ListBoardsResponse)
    async listBoards(@Args("listBoardsInput", { type: () => ListBoardsInput, nullable: true }) input) {
        return await this.boardService.listBoards(input || { limit: 10 });
    }
}