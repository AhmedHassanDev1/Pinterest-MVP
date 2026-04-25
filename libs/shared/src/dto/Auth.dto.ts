import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { AuthProvider } from "../types/proto/auth"
import { Type } from "class-transformer"
import { convertTextToMongoID } from "../utils/dataTransform"


export class AuthPayload {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    email: string

}

export class RegisterDTO {
    @IsNotEmpty({ message: "email is requied." })
    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    @MinLength(8, { message: "password is very short." })
    password?: string

    @Type(() => Date)
    @IsDate()
    birthDate: string

    @IsEnum(AuthProvider, { message: "provider must be local or google." })
    provider: AuthProvider

    @IsString()
    @IsOptional()
    providerId?: string

    @IsString()
    @IsOptional()
    idToken?: string
}

export class LogInDTO {
    @IsNotEmpty({ message: "email is requied." })
    @IsEmail()
    email: string

    @IsNotEmpty({ message: "password is requied." })
    @MinLength(8, { message: "password is very short." })
    password: string
}

export class CheckEmailDTO {
    @IsEmail()
    email: string;
}

export class RefreshTokenDTO {
    @IsString()
    @IsNotEmpty()
    refreshToken: string
}