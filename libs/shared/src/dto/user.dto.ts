import { Type } from "class-transformer";
import { IsDate, IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, MaxDate } from "class-validator";

export class CreateNewUserDTO {
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @Type(() => Date)
    @IsDate({ message: 'Birth date must be a valid date' })
    @MaxDate(new Date(), { message: 'Birth date cannot be in the future' })
    @IsOptional()
    birthDate?: string;
}

export class GetUserByIdDTO {
    @IsNotEmpty({ message: 'User ID is required' })
    id: string;
}

export class GetUserByEmailDTO {
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
}

export class ResetPasswortDTO {
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'New password is required' })
    newPassword: string;
}

export class GetProfileInfoRequestDTO {
    @IsMongoId({ message: 'User ID must be a valid MongoDB ObjectId' })
    @IsNotEmpty({ message: 'User ID is required' })
    userId: string;
}


