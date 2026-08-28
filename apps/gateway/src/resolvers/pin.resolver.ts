import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CreatePinInput, Pin, PublishPinInput, ListPinsResponse, ListPinsInput } from "../schema/pin.schema";
import { PinService } from "../services/pin.service";
import { SuccessMessage } from "../schema";


@Resolver()
export class PinResolver {
    constructor(
        private pinService: PinService
    ) { }

    @Query(() => Pin)
    async getPinById(@Args("id") id: string) {
        return await this.pinService.getPinById(id)
    }

  
    @Mutation(() => Pin)
    async createPin(@Args("createPinInput", { type: () => CreatePinInput }) pin) {
        return await this.pinService.createPin(pin)
    }

    @Query(() => ListPinsResponse)
    async listPins(@Args("listPinsInput", { type: () => ListPinsInput, nullable: true }) input) {
        return await this.pinService.listPins(input || {});
    }

    @Mutation(() => SuccessMessage)
    async deletePin(@Args("id") id: string) {
        return await this.pinService.deletePin(id);
    }
}