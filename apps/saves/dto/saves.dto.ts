import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class AddSaveRequestDTO {
    @IsNotEmpty()
    @IsMongoId()
    userId: string

    @IsNotEmpty()
    @IsMongoId()
    pinId: string
    
    @IsOptional()
    @IsMongoId()
    boardId?: string
}