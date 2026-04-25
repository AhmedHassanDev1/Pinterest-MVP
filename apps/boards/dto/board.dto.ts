import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBoardRequestDTO {
    @IsMongoId()
    userId: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsBoolean()
    @IsOptional()
    private: boolean
}

export class DeleteBoardDTO {
    @IsMongoId()
    id: string
}


export class EditeBoardRequestDTO {
    @IsMongoId()
    boardId: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsBoolean()
    private: boolean

    @IsOptional()
    @IsMongoId()
    boardCover: string
}

export class MergeBoardRequestDTO {
    @IsNotEmpty()
    mainBoardId: string
    
    @IsNotEmpty()
    nestBoardId: string
}