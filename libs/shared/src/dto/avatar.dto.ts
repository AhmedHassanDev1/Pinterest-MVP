import { IsMongoId, IsNotEmpty, IsString, IsUrl } from "class-validator";


export class GetAvatarRequestDTO {
    @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
    @IsNotEmpty({ message: 'User ID is required' })
    userId: string;
}

export class UploadAvatarRequestDTO {
    @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
    @IsNotEmpty({ message: 'User ID is required' })
    userId: string;

    @IsUrl()
    @IsNotEmpty({ message: 'url is required' })
    url: string

    @IsString()
    @IsNotEmpty({ message: 'Public ID is required' })
    publicId: string
}