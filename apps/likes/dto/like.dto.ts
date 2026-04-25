import { IsMongoId, IsNotEmpty } from "class-validator"

export class ToggleLikeDTO {
    @IsNotEmpty()
    @IsMongoId()
    userId: string

    @IsNotEmpty()
    @IsMongoId()
    pinId: string

}

