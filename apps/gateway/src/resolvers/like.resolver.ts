import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { LikeService } from "../services/like.service";
import { Like, AddLikeInput, RemoveLikeInput } from "../schema/like.schema";
import { SuccessMessage } from "../schema";
import { CurrentUser } from "../decorators/currentUser.decorator";

@Resolver()
export class LikeResolver {
    constructor(private likeService: LikeService) {}

    @Mutation(() => Like)
    async addLike(
        @Args("addLikeInput", { type: () => AddLikeInput }) input,
        @CurrentUser("id") userId: string
    ) {
        return await this.likeService.addLike({ ...input, userId });
    }

    @Mutation(() => SuccessMessage)
    async removeLike(
        @Args("removeLikeInput", { type: () => RemoveLikeInput }) input,
        @CurrentUser("id") userId: string
    ) {
        return await this.likeService.removeLike({ ...input, userId });
    }
}
