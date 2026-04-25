import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CreatePinInput, Pin, PublishPinInput } from "../schema/pin.schema";
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

   
} 