import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { AuthProvider } from "../types/proto/auth"
import { Type } from "class-transformer"
import { convertTextToMongoID } from "../utils/dataTransform"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class AuthPayload {
    @ApiProperty({ description: 'The unique identifier of the user' })
    @IsString()
    @IsNotEmpty()
    id: string

    @ApiProperty({ description: 'The first name of the user' })
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty({ description: 'The email of the user' })
    @IsString()
    @IsNotEmpty()
    email: string

}

export class RegisterDTO {
    @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
    @IsNotEmpty({ message: "email is requied." })
    @IsEmail()
    email: string

    @ApiPropertyOptional({ description: 'The password for local authentication', minLength: 8, example: 'strongPassword123' })
    @IsString()
    @IsOptional()
    @MinLength(8, { message: "password is very short." })
    password?: string

    @ApiProperty({ description: 'The birth date of the user', example: '1990-01-01' })
    @Type(() => Date)
    @IsDate()
    birthDate: string

    @ApiProperty({ description: 'Authentication provider', enum: AuthProvider })
    @IsEnum(AuthProvider, { message: "provider must be local or google." })
    provider: AuthProvider

    @ApiPropertyOptional({ description: 'Provider ID for OAuth' })
    @IsString()
    @IsOptional()
    providerId?: string

    @ApiPropertyOptional({ description: 'ID token for OAuth' })
    @IsString()
    @IsOptional()
    idToken?: string
}

export class LogInDTO {
    @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
    @IsNotEmpty({ message: "email is requied." })
    @IsEmail()
    email: string

    @ApiProperty({ description: 'The password of the user', minLength: 8, example: 'strongPassword123' })
    @IsNotEmpty({ message: "password is requied." })
    @MinLength(8, { message: "password is very short." })
    password: string
}

export class CheckEmailDTO {
    @ApiProperty({ description: 'The email address to check', example: 'user@example.com' })
    @IsEmail()
    email: string;
}

export class RefreshTokenDTO {
    @ApiProperty({ description: 'The refresh token string' })
    @IsString()
    @IsNotEmpty()
    refreshToken: string
}