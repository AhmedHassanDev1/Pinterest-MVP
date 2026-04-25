import { Type } from "class-transformer";
import { IsDate,  IsOptional, IsPositive } from "class-validator";


export class PaginationRequestDTO {

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    cursor?: string;

    @IsOptional()
    @IsPositive()
    limit: number
}