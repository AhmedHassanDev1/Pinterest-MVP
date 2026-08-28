import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { SaveService } from "../services/save.service";
import { Save, AddSaveInput, RemoveSaveInput, GetSavesResponse } from "../schema/save.schema";
import { SuccessMessage } from "../schema";
import { CurrentUser } from "../decorators/currentUser.decorator";

@Resolver()
export class SaveResolver {
    constructor(private saveService: SaveService) {}

    @Mutation(() => Save)
    async addSave(
        @Args("addSaveInput", { type: () => AddSaveInput }) input,
        @CurrentUser("id") userId: string
    ) {
        return await this.saveService.addSave({ ...input, userId });
    }

    @Mutation(() => SuccessMessage)
    async removeSave(
        @Args("removeSaveInput", { type: () => RemoveSaveInput }) input,
        @CurrentUser("id") userId: string
    ) {
        return await this.saveService.removeSave({ ...input, userId });
    }

    @Query(() => GetSavesResponse)
    async getSavesByBoard(@CurrentUser("id") userId: string) {
        return await this.saveService.getSavesByBoard({ userId });
    }

    @Query(() => GetSavesResponse)
    async getUnorganizedSaves(@CurrentUser("id") userId: string) {
        return await this.saveService.getUnorganizedSaves({ userId });
    }

    @Query(() => Boolean)
    async checkSave(
        @Args("pinId") pinId: string,
        @CurrentUser("id") userId: string
    ) {
        const response = await this.saveService.checkSave({ pinId, userId });
        return response.saved;
    }
}
