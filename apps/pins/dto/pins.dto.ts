import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";
import { PinType } from "@app/shared/types/proto/pins";

export class CreatePinRequestDTO {
    @IsString()
    @IsNotEmpty()
    userId: string

    @IsUrl()
    @IsNotEmpty()
    url: string

    @IsString()
    @IsNotEmpty()
    publicId: string

    @IsPositive()
    @IsNotEmpty()
    width: number

    @IsPositive()
    @IsNotEmpty()
    height: number

    @IsEnum(PinType)
    @IsNotEmpty()
    type: PinType

    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    link: string

    @IsBoolean()
    @IsOptional()
    allowComments: boolean
}

export class GetPinReqeustDTO {
    @IsNotEmpty()
    @IsMongoId()
    id: string

}

export class GetListPinsReqeust {

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    cursor?: Date;

    @IsOptional()
    @IsPositive()
    limit: number
}