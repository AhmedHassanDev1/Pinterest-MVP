import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator"

export class UpdateAvatarDTO {
    @IsString()
    @IsNotEmpty()
    profileId: string

    @IsString()
    @IsNotEmpty()
    publicId: string

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url: string
}


export class EditeProfileDTO {
    @IsString()
    @IsOptional()
    firstName?: string

    @IsString()
    @IsOptional()
    lastName?: string

    @IsString()
    @IsOptional()
    about?: string

    @IsString()
    @IsOptional()
    website?: string

    @IsString()
    @IsOptional()
    userName?: string
}

export class EditeAccountDTO {
    @IsString()
    @IsOptional()
    birthDate?: string

    @IsString()
    @IsOptional()
    location?: string

    @IsString()
    @IsOptional()
    language?: string

    @IsString()
    @IsOptional()
    gander?: string

}


export class DeleteAccountDTO {
    @IsUUID()
    @IsNotEmpty()
    userId: string
}